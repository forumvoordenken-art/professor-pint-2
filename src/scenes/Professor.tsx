import React from 'react';

interface ProfessorProps {
  // Head animations
  headRotation?: number;
  headTiltX?: number;
  headTiltY?: number;
  headScale?: number;
  
  // Eye animations
  eyeScaleY?: number;
  eyeOffsetX?: number;
  eyeOffsetY?: number;
  pupilOffsetX?: number;
  pupilOffsetY?: number;
  
  // Eyebrow animations
  leftEyebrowRotation?: number;
  rightEyebrowRotation?: number;
  leftEyebrowY?: number;
  rightEyebrowY?: number;
  
  // Mouth animations
  mouthOpen?: number;
  mouthWidth?: number;
  mouthCurve?: number;
  
  // Body animations
  bodyScale?: number;
  chestExpansion?: number;
  shoulderRotation?: number;
  
  // Left arm animations
  leftShoulderRotation?: number;
  leftElbowRotation?: number;
  leftWristRotation?: number;
  leftArmY?: number;
  
  // Right arm animations
  rightShoulderRotation?: number;
  rightElbowRotation?: number;
  rightWristRotation?: number;
  rightArmY?: number;
  
  // Hand animations
  leftHandRotation?: number;
  rightHandRotation?: number;
  leftHandScale?: number;
  rightHandScale?: number;
  
  // Mug animations
  mugRotation?: number;
  mugY?: number;
  mugTilt?: number;
  foamOpacity?: number;
  beerLevel?: number;
  
  // Leg animations
  leftLegRotation?: number;
  rightLegRotation?: number;
  leftKneeRotation?: number;
  rightKneeRotation?: number;
  
  // Overall position
  x?: number;
  y?: number;
  scale?: number;
  opacity?: number;
}

export const Professor: React.FC<ProfessorProps> = ({
  // Head defaults
  headRotation = 0,
  headTiltX = 0,
  headTiltY = 0,
  headScale = 1,
  
  // Eye defaults
  eyeScaleY = 1,
  eyeOffsetX = 0,
  eyeOffsetY = 0,
  pupilOffsetX = 0,
  pupilOffsetY = 0,
  
  // Eyebrow defaults
  leftEyebrowRotation = 0,
  rightEyebrowRotation = 0,
  leftEyebrowY = 0,
  rightEyebrowY = 0,
  
  // Mouth defaults
  mouthOpen = 0.3,
  mouthWidth = 1,
  mouthCurve = 0,
  
  // Body defaults
  bodyScale = 1,
  chestExpansion = 0,
  shoulderRotation = 0,
  
  // Left arm defaults
  leftShoulderRotation = 0,
  leftElbowRotation = 0,
  leftWristRotation = 0,
  leftArmY = 0,
  
  // Right arm defaults
  rightShoulderRotation = 0,
  rightElbowRotation = 0,
  rightWristRotation = 0,
  rightArmY = 0,
  
  // Hand defaults
  leftHandRotation = 0,
  rightHandRotation = 0,
  leftHandScale = 1,
  rightHandScale = 1,
  
  // Mug defaults
  mugRotation = 0,
  mugY = 0,
  mugTilt = 0,
  foamOpacity = 0.8,
  beerLevel = 0.9,
  
  // Leg defaults
  leftLegRotation = 0,
  rightLegRotation = 0,
  leftKneeRotation = 0,
  rightKneeRotation = 0,
  
  // Overall defaults
  x = 0,
  y = 0,
  scale = 1,
  opacity = 1,
}) => {
  return (
    <svg
      width="800"
      height="1200"
      viewBox="0 0 800 1200"
      style={{
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        opacity,
      }}
    >
      {/* ========== LEGS GROUP ========== */}
      <g id="legs-group">
        {/* Left Leg */}
        <g
          id="left-leg"
          transform={`rotate(${leftLegRotation} 350 645)`}
          style={{transformOrigin: '350px 645px'}}
        >
          {/* Upper leg */}
          <rect
            x="310"
            y="645"
            width="80"
            height="100"
            fill="#4a3428"
            rx="10"
          />
          
          {/* Lower leg (with knee rotation) */}
          <g
            transform={`rotate(${leftKneeRotation} 350 745)`}
            style={{transformOrigin: '350px 745px'}}
          >
            <rect
              x="310"
              y="745"
              width="80"
              height="80"
              fill="#4a3428"
              rx="10"
            />
          </g>
          
          {/* Left shoe */}
          <ellipse cx="350" cy="825" rx="45" ry="25" fill="#2a1810" />
          <ellipse cx="350" cy="820" rx="35" ry="15" fill="#1a1008" opacity="0.6" />
        </g>

        {/* Right Leg */}
        <g
          id="right-leg"
          transform={`rotate(${rightLegRotation} 450 645)`}
          style={{transformOrigin: '450px 645px'}}
        >
          {/* Upper leg */}
          <rect
            x="410"
            y="645"
            width="80"
            height="100"
            fill="#4a3428"
            rx="10"
          />
          
          {/* Lower leg (with knee rotation) */}
          <g
            transform={`rotate(${rightKneeRotation} 450 745)`}
            style={{transformOrigin: '450px 745px'}}
          >
            <rect
              x="410"
              y="745"
              width="80"
              height="80"
              fill="#4a3428"
              rx="10"
            />
          </g>
          
          {/* Right shoe */}
          <ellipse cx="450" cy="825" rx="45" ry="25" fill="#2a1810" />
          <ellipse cx="450" cy="820" rx="35" ry="15" fill="#1a1008" opacity="0.6" />
        </g>

        {/* Belt */}
        <rect
          x="300"
          y="630"
          width="200"
          height="20"
          fill="#2a1810"
          rx="3"
        />
        <rect
          x="385"
          y="625"
          width="30"
          height="30"
          fill="#8f5f18"
          rx="3"
        />
        <rect
          x="390"
          y="630"
          width="20"
          height="20"
          fill="#6f4f10"
          rx="2"
        />
      </g>

      {/* ========== BODY GROUP ========== */}
      <g
        id="body-group"
        transform={`scale(${bodyScale})`}
        style={{transformOrigin: '400px 500px'}}
      >
        {/* Torso - Jacket */}
        <g id="jacket">
          {/* Main jacket body */}
          <rect
            x="275"
            y="365"
            width="250"
            height="280"
            fill="#3a2a1f"
            rx="15"
          />
          
          {/* Jacket shadow/depth */}
          <rect
            x="275"
            y="365"
            width="250"
            height="280"
            fill="url(#jacketGradient)"
            rx="15"
          />
          
          {/* Left lapel */}
          <path
            d="M 300 365 L 280 385 L 320 500 L 360 500 L 360 365 Z"
            fill="#2a1a0f"
          />
          
          {/* Right lapel */}
          <path
            d="M 500 365 L 520 385 L 480 500 L 440 500 L 440 365 Z"
            fill="#2a1a0f"
          />
          
          {/* Jacket buttons */}
          <circle cx="380" cy="420" r="8" fill="#1a1208" />
          <circle cx="380" cy="470" r="8" fill="#1a1208" />
          <circle cx="380" cy="520" r="8" fill="#1a1208" />
          
          {/* Button highlights */}
          <circle cx="382" cy="418" r="3" fill="#3a2a1f" opacity="0.5" />
          <circle cx="382" cy="468" r="3" fill="#3a2a1f" opacity="0.5" />
          <circle cx="382" cy="518" r="3" fill="#3a2a1f" opacity="0.5" />
          
          {/* Jacket pockets */}
          <rect
            x="290"
            y="540"
            width="60"
            height="15"
            fill="#2a1a0f"
            rx="3"
          />
          <rect
            x="450"
            y="540"
            width="60"
            height="15"
            fill="#2a1a0f"
            rx="3"
          />
          
          {/* Pocket flaps */}
          <path
            d="M 290 540 L 350 540 L 345 555 L 295 555 Z"
            fill="#1a1008"
            opacity="0.3"
          />
          <path
            d="M 450 540 L 510 540 L 505 555 L 455 555 Z"
            fill="#1a1008"
            opacity="0.3"
          />
        </g>

        {/* Shirt */}
        <g id="shirt">
          {/* White shirt visible area */}
          <polygon
            points="400,365 350,365 350,500 450,500 450,365"
            fill="#e8dcc8"
          />
          
          {/* Shirt collar */}
          <path
            d="M 380 365 L 370 365 L 375 385 L 385 375 Z"
            fill="#f5f0e8"
          />
          <path
            d="M 420 365 L 430 365 L 425 385 L 415 375 Z"
            fill="#f5f0e8"
          />
          
          {/* Shirt buttons (subtle) */}
          <circle cx="400" cy="400" r="3" fill="#d8d0c0" />
          <circle cx="400" cy="430" r="3" fill="#d8d0c0" />
          <circle cx="400" cy="460" r="3" fill="#d8d0c0" />
        </g>

        {/* Tie */}
        <g id="tie">
          {/* Tie knot */}
          <path
            d="M 400 370 L 390 375 L 395 385 L 400 390 L 405 385 L 410 375 Z"
            fill="#8b2f2f"
          />
          
          {/* Tie body */}
          <polygon
            points="400,390 385,390 390,500 410,500 415,390"
            fill="#8b2f2f"
          />
          
          {/* Tie pattern (subtle stripes) */}
          <line x1="395" y1="410" x2="405" y2="410" stroke="#6b1f1f" strokeWidth="1" opacity="0.5" />
          <line x1="395" y1="440" x2="405" y2="440" stroke="#6b1f1f" strokeWidth="1" opacity="0.5" />
          <line x1="395" y1="470" x2="405" y2="470" stroke="#6b1f1f" strokeWidth="1" opacity="0.5" />
          
          {/* Tie shadow */}
          <polygon
            points="400,390 395,390 398,500 402,500 405,390"
            fill="#000"
            opacity="0.15"
          />
        </g>

        {/* Chest expansion area */}
        <ellipse
          cx="400"
          cy="450"
          rx={80 + chestExpansion * 3}
          ry={60 + chestExpansion * 2}
          fill="transparent"
          stroke="none"
        />

        {/* Shoulders with rotation */}
        <g
          id="shoulders"
          transform={`rotate(${shoulderRotation} 400 365)`}
          style={{transformOrigin: '400px 365px'}}
        >
          <ellipse cx="300" cy="365" rx="45" ry="25" fill="#3a2a1f" />
          <ellipse cx="500" cy="365" rx="45" ry="25" fill="#3a2a1f" />
        </g>
      </g>

      {/* ========== ARMS GROUP ========== */}
      {/* Left Arm (with beer mug) */}
      <g id="left-arm-group">
        <g
          transform={`rotate(${leftShoulderRotation} 280 380) translate(0, ${leftArmY})`}
          style={{transformOrigin: '280px 380px'}}
        >
          {/* Upper arm */}
          <rect
            x="220"
            y="370"
            width="70"
            height="45"
            fill="#3a2a1f"
            rx="22"
          />
          
          {/* Elbow area */}
          <g
            transform={`rotate(${leftElbowRotation} 220 395)`}
            style={{transformOrigin: '220px 395px'}}
          >
            {/* Forearm */}
            <rect
              x="160"
              y="380"
              width="65"
              height="40"
              fill="#3a2a1f"
              rx="20"
            />
            
            {/* Wrist */}
            <g
              transform={`rotate(${leftWristRotation} 165 400)`}
              style={{transformOrigin: '165px 400px'}}
            >
              {/* Hand */}
              <g
                transform={`rotate(${leftHandRotation} 165 410) scale(${leftHandScale})`}
                style={{transformOrigin: '165px 410px'}}
              >
                <ellipse cx="165" cy="410" rx="28" ry="32" fill="#f2ad68" />
                
                {/* Thumb */}
                <ellipse cx="180" cy="405" rx="12" ry="18" fill="#f2ad68" />
                
                {/* Fingers holding mug */}
                <ellipse cx="145" cy="405" rx="10" ry="22" fill="#f2ad68" />
                <ellipse cx="148" cy="425" rx="8" ry="18" fill="#f2ad68" />
                
                {/* Hand details */}
                <path
                  d="M 165 395 Q 170 400 165 410"
                  stroke="#d89858"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                />
              </g>

              {/* Beer Mug */}
              <g
                id="beer-mug"
                transform={`translate(0, ${mugY}) rotate(${mugRotation} 150 430) rotate(${mugTilt} 165 430)`}
                style={{transformOrigin: '165px 430px'}}
              >
                {/* Mug body */}
                <rect
                  x="140"
                  y="400"
                  width="50"
                  height="65"
                  fill="#f2c15f"
                  stroke="#8f5f18"
                  strokeWidth="3"
                  rx="8"
                />
                
                {/* Mug gradient for glass effect */}
                <rect
                  x="142"
                  y="402"
                  width="46"
                  height="61"
                  fill="url(#beerGradient)"
                  rx="7"
                />
                
                {/* Beer inside */}
                <rect
                  x="145"
                  y={405 + (1 - beerLevel) * 55}
                  width="40"
                  height={55 * beerLevel}
                  fill="#d9a52e"
                  rx="5"
                />
                
                {/* Beer foam */}
                <ellipse
                  cx="165"
                  cy="405"
                  rx="22"
                  ry="10"
                  fill="#f8de98"
                  opacity={foamOpacity}
                />
                
                {/* Foam bubbles */}
                <circle cx="160" cy="403" r="4" fill="#fff" opacity={foamOpacity * 0.8} />
                <circle cx="170" cy="405" r="3" fill="#fff" opacity={foamOpacity * 0.7} />
                <circle cx="165" cy="401" r="3" fill="#fff" opacity={foamOpacity * 0.6} />
                
                {/* Mug handle */}
                <path
                  d="M 190 415 Q 210 415 210 430 Q 210 445 190 445"
                  fill="none"
                  stroke="#8f5f18"
                  strokeWidth="4"
                />
                <path
                  d="M 192 417 Q 208 417 208 430 Q 208 443 192 443"
                  fill="none"
                  stroke="#f2c15f"
                  strokeWidth="2"
                  opacity="0.6"
                />
                
                {/* Mug rim */}
                <ellipse
                  cx="165"
                  cy="400"
                  rx="25"
                  ry="6"
                  fill="#b8792f"
                  stroke="#8f5f18"
                  strokeWidth="2"
                />
                
                {/* Glass shine effect */}
                <rect
                  x="145"
                  y="410"
                  width="8"
                  height="40"
                  fill="#fff"
                  opacity="0.25"
                  rx="4"
                />
              </g>
            </g>
          </g>
        </g>
      </g>

      {/* Right Arm (gesturing) */}
      <g id="right-arm-group">
        <g
          transform={`rotate(${rightShoulderRotation} 520 380) translate(0, ${rightArmY})`}
          style={{transformOrigin: '520px 380px'}}
        >
          {/* Upper arm */}
          <rect
            x="510"
            y="370"
            width="70"
            height="45"
            fill="#3a2a1f"
            rx="22"
          />
          
          {/* Elbow area */}
          <g
            transform={`rotate(${rightElbowRotation} 580 395)`}
            style={{transformOrigin: '580px 395px'}}
          >
            {/* Forearm */}
            <rect
              x="575"
              y="380"
              width="65"
              height="40"
              fill="#3a2a1f"
              rx="20"
            />
            
            {/* Wrist */}
            <g
              transform={`rotate(${rightWristRotation} 635 400)`}
              style={{transformOrigin: '635px 400px'}}
            >
              {/* Hand */}
              <g
                transform={`rotate(${rightHandRotation} 635 410) scale(${rightHandScale})`}
                style={{transformOrigin: '635px 410px'}}
              >
                <ellipse cx="635" cy="410" rx="28" ry="32" fill="#f2ad68" />
                
                {/* Thumb */}
                <ellipse cx="620" cy="405" rx="12" ry="18" fill="#f2ad68" />
                
                {/* Fingers (pointing/gesturing) */}
                <ellipse cx="650" cy="395" rx="10" ry="25" fill="#f2ad68" />
                <ellipse cx="655" cy="400" rx="9" ry="22" fill="#f2ad68" />
                <ellipse cx="658" cy="408" rx="8" ry="20" fill="#f2ad68" />
                
                {/* Hand details */}
                <path
                  d="M 635 395 Q 630 400 635 410"
                  stroke="#d89858"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                />
              </g>
            </g>
          </g>
        </g>
      </g>

      {/* ========== HEAD GROUP ========== */}
      <g
        id="head-group"
        transform={`
          translate(${headTiltX}, ${headTiltY})
          rotate(${headRotation} 400 220)
          scale(${headScale})
        `}
        style={{transformOrigin: '400px 220px'}}
      >
        {/* Neck */}
        <g id="neck">
          <rect
            x="370"
            y="310"
            width="60"
            height="60"
            fill="#e8a868"
            rx="8"
          />
          {/* Neck shadow */}
          <rect
            x="370"
            y="310"
            width="60"
            height="20"
            fill="#000"
            opacity="0.1"
          />
        </g>

        {/* Head base */}
        <ellipse cx="400" cy="220" rx="170" ry="145" fill="#f2ad68" />
        
        {/* Head shading for depth */}
        <ellipse cx="400" cy="220" rx="170" ry="145" fill="url(#headGradient)" />

        {/* Ears */}
        <g id="ears">
          {/* Left ear */}
          <ellipse cx="255" cy="220" rx="60" ry="80" fill="#e8a868" />
          <ellipse cx="255" cy="220" rx="60" ry="80" fill="url(#earGradient)" />
          <ellipse cx="265" cy="220" rx="35" ry="50" fill="#d89858" opacity="0.4" />
          
          {/* Right ear */}
          <ellipse cx="545" cy="220" rx="60" ry="80" fill="#e8a868" />
          <ellipse cx="545" cy="220" rx="60" ry="80" fill="url(#earGradient)" />
          <ellipse cx="535" cy="220" rx="35" ry="50" fill="#d89858" opacity="0.4" />
        </g>

        {/* Hair/Sideburns */}
        <g id="hair">
          {/* Left sideburn */}
          <path
            d="M 270 180 Q 260 200 265 240 L 280 240 Q 275 210 280 180 Z"
            fill="#5d4a3a"
          />
          
          {/* Right sideburn */}
          <path
            d="M 530 180 Q 540 200 535 240 L 520 240 Q 525 210 520 180 Z"
            fill="#5d4a3a"
          />
          
          {/* Top of head hair (receding) */}
          <ellipse cx="400" cy="100" rx="140" ry="35" fill="#5d4a3a" />
          <ellipse cx="400" cy="110" rx="130" ry="30" fill="#6d5a4a" opacity="0.6" />
        </g>

        {/* Eyebrows */}
        <g id="eyebrows">
          {/* Left eyebrow */}
          <g
            transform={`
              translate(0, ${leftEyebrowY})
              rotate(${leftEyebrowRotation} 320 210)
            `}
            style={{transformOrigin: '320px 210px'}}
          >
            <ellipse cx="320" cy="210" rx="45" ry="12" fill="#5d4a3a" />
            <path
              d="M 280 212 Q 320 205 360 212"
              stroke="#4d3a2a"
              strokeWidth="3"
              fill="none"
            />
          </g>
          
          {/* Right eyebrow */}
          <g
            transform={`
              translate(0, ${rightEyebrowY})
              rotate(${rightEyebrowRotation} 480 210)
            `}
            style={{transformOrigin: '480px 210px'}}
          >
            <ellipse cx="480" cy="210" rx="45" ry="12" fill="#5d4a3a" />
            <path
              d="M 440 212 Q 480 205 520 212"
              stroke="#4d3a2a"
              strokeWidth="3"
              fill="none"
            />
          </g>
        </g>

        {/* Glasses */}
        <g id="glasses">
          {/* Left lens frame */}
          <circle
            cx="340"
            cy="235"
            r="40"
            fill="rgba(255,255,255,0.1)"
            stroke="#17120f"
            strokeWidth="5"
          />
          
          {/* Right lens frame */}
          <circle
            cx="465"
            cy="235"
            r="40"
            fill="rgba(255,255,255,0.1)"
            stroke="#17120f"
            strokeWidth="5"
          />
          
          {/* Bridge */}
          <line
            x1="380"
            y1="235"
            x2="425"
            y2="235"
            stroke="#17120f"
            strokeWidth="5"
          />
          
          {/* Left temple */}
          <line
            x1="300"
            y1="235"
            x2="270"
            y2="225"
            stroke="#17120f"
            strokeWidth="4"
          />
          
          {/* Right temple */}
          <line
            x1="505"
            y1="235"
            x2="535"
            y2="225"
            stroke="#17120f"
            strokeWidth="4"
          />
          
          {/* Glass glare effects */}
          <circle cx="325" cy="220" r="12" fill="#fff" opacity="0.4" />
          <circle cx="450" cy="220" r="12" fill="#fff" opacity="0.4" />
          <circle cx="332" cy="228" r="6" fill="#fff" opacity="0.6" />
          <circle cx="457" cy="228" r="6" fill="#fff" opacity="0.6" />
        </g>

        {/* Eyes */}
        <g id="eyes" transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
          {/* Left eye white */}
          <ellipse cx="340" cy="235" rx="18" ry="20" fill="#fff" />
          
          {/* Right eye white */}
          <ellipse cx="465" cy="235" rx="18" ry="20" fill="#fff" />
          
          {/* Left iris */}
          <ellipse
            cx={340 + pupilOffsetX}
            cy={235 + pupilOffsetY}
            rx="12"
            ry={12 * eyeScaleY}
            fill="#4a3428"
          />
          
          {/* Right iris */}
          <ellipse
            cx={465 + pupilOffsetX}
            cy={235 + pupilOffsetY}
            rx="12"
            ry={12 * eyeScaleY}
            fill="#4a3428"
          />
          
          {/* Left pupil */}
          <ellipse
            cx={340 + pupilOffsetX}
            cy={235 + pupilOffsetY}
            rx="8"
            ry={8 * eyeScaleY}
            fill="#000"
          />
          
          {/* Right pupil */}
          <ellipse
            cx={465 + pupilOffsetX}
            cy={235 + pupilOffsetY}
            rx="8"
            ry={8 * eyeScaleY}
            fill="#000"
          />
          
          {/* Eye highlights (disappear when blinking) */}
          {eyeScaleY > 0.5 && (
            <>
              <circle cx={343 + pupilOffsetX} cy={230 + pupilOffsetY} r="4" fill="#fff" opacity="0.9" />
              <circle cx={468 + pupilOffsetX} cy={230 + pupilOffsetY} r="4" fill="#fff" opacity="0.9" />
              <circle cx={338 + pupilOffsetX} cy={238 + pupilOffsetY} r="2" fill="#fff" opacity="0.6" />
              <circle cx={463 + pupilOffsetX} cy={238 + pupilOffsetY} r="2" fill="#fff" opacity="0.6" />
            </>
          )}
        </g>

        {/* Nose */}
        <g id="nose">
          <ellipse cx="405" cy="270" rx="22" ry="28" fill="#d89858" />
          <ellipse cx="405" cy="268" rx="20" ry="26" fill="#e8a868" />
          
          {/* Nostrils */}
          <ellipse cx="395" cy="282" rx="6" ry="8" fill="#c47742" opacity="0.7" />
          <ellipse cx="415" cy="282" rx="6" ry="8" fill="#c47742" opacity="0.7" />
          
          {/* Nose highlight */}
          <ellipse cx="400" cy="260" rx="8" ry="12" fill="#fff" opacity="0.3" />
        </g>

        {/* Mustache */}
        <g id="mustache">
          {/* Main mustache body */}
          <ellipse cx="405" cy="288" rx="55" ry="24" fill="#5d4a3a" />
          
          {/* Left side detail */}
          <ellipse cx="360" cy="288" rx="32" ry="20" fill="#5d4a3a" />
          <ellipse cx="345" cy="290" rx="22" ry="14" fill="#6d5a4a" />
          
          {/* Right side detail */}
          <ellipse cx="450" cy="288" rx="32" ry="20" fill="#5d4a3a" />
          <ellipse cx="465" cy="290" rx="22" ry="14" fill="#6d5a4a" />
          
          {/* Mustache highlights */}
          <path
            d="M 350 283 Q 400 280 450 283"
            stroke="#7d6a5a"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
          
          {/* Center separation */}
          <line
            x1="405"
            y1="280"
            x2="405"
            y2="296"
            stroke="#4d3a2a"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </g>

        {/* Mouth */}
        <g id="mouth">
          {/* Mouth opening */}
          <ellipse
            cx="405"
            cy={308 + mouthCurve * 3}
            rx={45 * mouthWidth}
            ry={12 * mouthOpen}
            fill="#5b250d"
            opacity="0.95"
          />
          
          {/* Tongue (visible when mouth open enough) */}
          {mouthOpen > 0.6 && (
            <ellipse
              cx="405"
              cy={312 + mouthCurve * 3}
              rx={35 * mouthWidth * 0.8}
              ry={8 * mouthOpen * 0.6}
              fill="#d46a6a"
              opacity="0.8"
            />
          )}
          
          {/* Teeth (visible when mouth open) */}
          {mouthOpen > 0.5 && (
            <>
              <rect
                x={405 - 30 * mouthWidth}
                y={302 + mouthCurve * 3}
                width={60 * mouthWidth}
                height={6}
                fill="#f5f0e8"
                rx="2"
              />
            </>
          )}
          
          {/* Mouth bottom lip shadow */}
          <ellipse
            cx="405"
            cy={315 + mouthCurve * 3}
            rx={42 * mouthWidth}
            ry={4}
            fill="#c47742"
            opacity="0.3"
          />
        </g>

        {/* Chin/Jaw definition */}
        <ellipse cx="405" cy="320" rx="80" ry="50" fill="#e8a868" opacity="0.2" />
      </g>

      {/* ========== SVG GRADIENTS ========== */}
      <defs>
        {/* Head gradient for 3D effect */}
        <radialGradient id="headGradient" cx="45%" cy="35%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#f2ad68" stopOpacity="0" />
          <stop offset="100%" stopColor="#c47742" stopOpacity="0.3" />
        </radialGradient>
        
        {/* Ear gradient */}
        <radialGradient id="earGradient" cx="40%" cy="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.2" />
        </radialGradient>
        
        {/* Jacket gradient */}
        <linearGradient id="jacketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
        
        {/* Beer gradient for glass effect */}
        <linearGradient id="beerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
};
