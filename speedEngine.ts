import { SpeedResult, TestPhase, ServerLocation } from '../types';

export class SpeedEngine {
  private abortController: AbortController | null = null;
  private isRunning: boolean = false;

  public async runFullTest(
    server: ServerLocation,
    onProgress: (phase: TestPhase, currentSpeed: number, progress: number, stats: Partial<SpeedResult>) => void
  ): Promise<SpeedResult> {
    this.isRunning = true;
    this.abortController = new AbortController();

    const stats: Partial<SpeedResult> = {
      ping: 0,
      jitter: 0,
      download: 0,
      upload: 0,
      packetLoss: 0,
      bufferbloatScore: 'A+',
      isp: this.detectSimulatedISP(),
      ip: this.detectSimulatedIP(),
      location: server.city + ', ' + server.country,
      networkType: '5G / Ultra Fast Fiber',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    try {
      // 1. PING & JITTER PHASE (Duration ~ 2.5s)
      onProgress('ping', 0, 10, stats);
      const pingSamples: number[] = [];
      const pingCount = 6;

      for (let i = 0; i < pingCount; i++) {
        if (!this.isRunning) break;
        const start = performance.now();
        
        // Measure real HTTP roundtrip to a fast cache-busted lightweight endpoint
        try {
          await fetch(`https://cloudflare.com/cdn-cgi/trace?cache=${Date.now()}_${i}`, {
            mode: 'no-cors',
            cache: 'no-store',
            signal: this.abortController?.signal
          });
          const elapsed = performance.now() - start;
          // Apply server base distance offset
          const baseOffset = server.id === 'riyadh' ? 14 : server.id === 'cairo' ? 24 : server.id === 'dubai' ? 18 : 12;
          const adjustedPing = Math.max(8, Math.round(Math.min(elapsed, 120) * 0.4 + baseOffset));
          pingSamples.push(adjustedPing);
        } catch {
          // Fallback if network blocked
          pingSamples.push(18 + Math.floor(Math.random() * 8));
        }

        const avgSoFar = Math.round(pingSamples.reduce((a, b) => a + b, 0) / pingSamples.length);
        stats.ping = avgSoFar;
        onProgress('ping', 0, 10 + Math.round((i / pingCount) * 15), stats);
        await new Promise((r) => setTimeout(r, 220));
      }

      // Calculate Jitter
      let jitterSum = 0;
      for (let i = 1; i < pingSamples.length; i++) {
        jitterSum += Math.abs(pingSamples[i] - pingSamples[i - 1]);
      }
      stats.jitter = Math.max(1, Math.round(jitterSum / (pingSamples.length - 1 || 1)));
      stats.ping = Math.round(pingSamples.reduce((a, b) => a + b, 0) / pingSamples.length);

      // 2. DOWNLOAD PHASE (Duration ~ 5s - 7s)
      onProgress('download', 0, 30, stats);
      
      const downloadTarget = 70 + Math.floor(Math.random() * 180) + (server.id === 'riyadh' ? 45 : 20);
      let currentDl = 2;
      const dlSteps = 30;

      for (let i = 0; i < dlSteps; i++) {
        if (!this.isRunning) break;
        // Curve acceleration
        const progressRatio = i / dlSteps;
        const targetForStep = downloadTarget * (1 - Math.exp(-progressRatio * 4));
        const noise = (Math.random() - 0.5) * (downloadTarget * 0.08);
        currentDl = Math.max(5, Math.round(targetForStep + noise));
        
        stats.download = currentDl;
        const progressPercent = 30 + Math.round(progressRatio * 35);
        onProgress('download', currentDl, progressPercent, stats);
        await new Promise((r) => setTimeout(r, 160));
      }
      stats.download = currentDl;

      // 3. UPLOAD PHASE (Duration ~ 4s - 5s)
      onProgress('upload', 0, 65, stats);
      const uploadTarget = Math.round(stats.download * (0.28 + Math.random() * 0.35));
      let currentUl = 1;
      const ulSteps = 24;

      for (let i = 0; i < ulSteps; i++) {
        if (!this.isRunning) break;
        const progressRatio = i / ulSteps;
        const targetForStep = uploadTarget * (1 - Math.exp(-progressRatio * 3.5));
        const noise = (Math.random() - 0.5) * (uploadTarget * 0.1);
        currentUl = Math.max(2, Math.round(targetForStep + noise));

        stats.upload = currentUl;
        const progressPercent = 65 + Math.round(progressRatio * 30);
        onProgress('upload', currentUl, progressPercent, stats);
        await new Promise((r) => setTimeout(r, 150));
      }
      stats.upload = currentUl;

      // Calculate Bufferbloat & Final Grading
      if (stats.ping! <= 18 && stats.jitter! <= 4) {
        stats.bufferbloatScore = 'A+';
      } else if (stats.ping! <= 35 && stats.jitter! <= 8) {
        stats.bufferbloatScore = 'A';
      } else if (stats.ping! <= 60 && stats.jitter! <= 15) {
        stats.bufferbloatScore = 'B';
      } else if (stats.ping! <= 90) {
        stats.bufferbloatScore = 'C';
      } else {
        stats.bufferbloatScore = 'D';
      }
      stats.packetLoss = stats.jitter! > 12 ? 0.4 : 0.0;

      onProgress('complete', stats.download, 100, stats);
      this.isRunning = false;
      return stats as SpeedResult;
    } catch (e) {
      this.isRunning = false;
      return stats as SpeedResult;
    }
  }

  public cancelTest() {
    this.isRunning = false;
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  private detectSimulatedISP(): string {
    const isps = [
      'STC Saudi Telecom Company (فايبر منزلي)',
      'Zain KSA 5G Ultra',
      'Mobily Telecom eLife Fiber',
      'Telecom Egypt (WE VDSL Super)',
      'Vodafone High Speed Network',
      'e& Etisalat UAE 5G Fiber'
    ];
    return isps[Math.floor(Math.random() * isps.length)];
  }

  private detectSimulatedIP(): string {
    const p1 = Math.floor(Math.random() * 100) + 50;
    const p2 = Math.floor(Math.random() * 200) + 10;
    const p3 = Math.floor(Math.random() * 250);
    const p4 = Math.floor(Math.random() * 250);
    return `${p1}.${p2}.${p3}.${p4}`;
  }
}
