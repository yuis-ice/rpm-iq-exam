import React from 'react';
import { Pattern, Shape } from '../types/game';

interface PatternDisplayProps {
  pattern: Pattern;
  size: number;
}

const PatternDisplay: React.FC<PatternDisplayProps> = ({ pattern, size }) => {
  const renderShape = (shape: Shape, index: number) => {
    const centerX = size / 2;
    const centerY = size / 2;
    
    // Calculate position based on shape position or center
    const x = shape.position ? (shape.position.x * size) : centerX;
    const y = shape.position ? (shape.position.y * size) : centerY;
    
    // Size mapping
    const sizeMap = {
      small: size * 0.2,
      medium: size * 0.3,
      large: size * 0.4
    };
    
    const shapeSize = sizeMap[shape.size];
    
    // Color mapping
    const colorMap = {
      black: '#1f2937',
      gray: '#6b7280',
      white: '#ffffff'
    };
    
    const fillColor = colorMap[shape.color];
    const strokeColor = shape.color === 'white' ? '#1f2937' : 'none';
    const strokeWidth = shape.color === 'white' ? 2 : 0;
    
    const transform = shape.rotation ? `rotate(${shape.rotation} ${x} ${y})` : '';
    
    switch (shape.type) {
      case 'circle':
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={shapeSize / 2}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            transform={transform}
          />
        );
        
      case 'square':
        return (
          <rect
            key={index}
            x={x - shapeSize / 2}
            y={y - shapeSize / 2}
            width={shapeSize}
            height={shapeSize}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            transform={transform}
          />
        );
        
      case 'triangle':
        const trianglePoints = [
          `${x},${y - shapeSize / 2}`,
          `${x - shapeSize / 2},${y + shapeSize / 2}`,
          `${x + shapeSize / 2},${y + shapeSize / 2}`
        ].join(' ');
        
        return (
          <polygon
            key={index}
            points={trianglePoints}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            transform={transform}
          />
        );
        
      case 'diamond':
        const diamondPoints = [
          `${x},${y - shapeSize / 2}`,
          `${x + shapeSize / 2},${y}`,
          `${x},${y + shapeSize / 2}`,
          `${x - shapeSize / 2},${y}`
        ].join(' ');
        
        return (
          <polygon
            key={index}
            points={diamondPoints}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            transform={transform}
          />
        );
        
      case 'cross':
        const crossThickness = shapeSize * 0.3;
        return (
          <g key={index} transform={transform}>
            <rect
              x={x - crossThickness / 2}
              y={y - shapeSize / 2}
              width={crossThickness}
              height={shapeSize}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <rect
              x={x - shapeSize / 2}
              y={y - crossThickness / 2}
              width={shapeSize}
              height={crossThickness}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </g>
        );
        
      case 'star':
        const starPoints = [];
        const outerRadius = shapeSize / 2;
        const innerRadius = outerRadius * 0.4;
        
        for (let i = 0; i < 10; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / 5 - Math.PI / 2;
          const pointX = x + radius * Math.cos(angle);
          const pointY = y + radius * Math.sin(angle);
          starPoints.push(`${pointX},${pointY}`);
        }
        
        return (
          <polygon
            key={index}
            points={starPoints.join(' ')}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            transform={transform}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {pattern.shapes.map(renderShape)}
    </svg>
  );
};

export default PatternDisplay;