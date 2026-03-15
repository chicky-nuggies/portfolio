declare module '@/components/FaultyTerminal' {
  import React from 'react';

  interface FaultyTerminalProps {
    scale?: number;
    gridMul?: number[];
    digitSize?: number;
    timeScale?: number;
    pause?: boolean;
    scanlineIntensity?: number;
    glitchAmount?: number;
    flickerAmount?: number;
    noiseAmp?: number;
    chromaticAberration?: number;
    dither?: number | boolean;
    curvature?: number;
    tint?: string;
    mouseReact?: boolean;
    mouseStrength?: number;
    pageLoadAnimation?: boolean;
    brightness?: number;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
  }

  const FaultyTerminal: React.FC<FaultyTerminalProps>;
  export default FaultyTerminal;
}
