/**
 * SANYUKTbgSVG — Full-width solid-fill "SANYUKT" for the footer with elevated Y-scale.
 * Fills 100% width and stands tall with massive, imposing letterforms matching the Dipram footer.
 */

const SANYUKTbgSVG = ({ className = '', style = {}, ...props }) => (
  <svg
    viewBox="0 0 1000 260"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className={`sanyukt-bg-svg ${className}`}
    style={{
      width: '100%',
      height: 'clamp(200px, 30vw, 520px)',
      display: 'block',
      ...style,
    }}
    aria-hidden="true"
    {...props}
  >
    <text
      x="500"
      y="235"
      textAnchor="middle"
      fontFamily="'MainFont', 'Bebas Neue', 'Impact', sans-serif"
      fontSize="200"
      fontWeight="900"
      fill="currentColor"
      textLength="1000"
      lengthAdjust="spacingAndGlyphs"
    >
      SANYUKT
    </text>
  </svg>
);

export default SANYUKTbgSVG;
