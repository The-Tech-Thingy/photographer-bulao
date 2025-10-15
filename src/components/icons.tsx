import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 152 72"
      width="152"
      height="72"
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        {/* Camera Body */}
        <path
          fill="#111827"
          d="M66.427 1.137C68.421.433 70.579.433 72.573 1.137L76.512 2.5h7.222c6.04 0 11.493 4.206 12.872 10.057l.874 3.652h3.585c5.333 0 9.655 4.322 9.655 9.655v26.272c0 5.333-4.322 9.655-9.655 9.655H40.915c-5.333 0-9.655-4.322-9.655-9.655V25.864c0-5.333 4.322-9.655 9.655-9.655h3.585l.874-3.652c1.379-5.85 6.832-10.057 12.872-10.057h7.222l3.939-1.363z"
        />
        <path fill="#FFD700" d="M69.5 54.131c4.58.625 8.27-2.877 8.27-7.234 0-.59-.074-1.16-.21-1.7H61.44c-.136.54-.21 1.11-.21 1.7 0 4.357 3.69 7.859 8.27 7.234z" opacity=".8"/>
        
        {/* Lens and Pin */}
        <g transform="translate(54 18)">
          <circle fill="#FFF" cx="15.5" cy="15.5" r="15.5" />
          <path
            d="M15.5 28C10.253 28 6 23.747 6 18.5S10.253 9 15.5 9s9.5 4.253 9.5 9.5-4.253 9.5-9.5 9.5zm0-2c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5-7.5 3.358-7.5 7.5 3.358 7.5 7.5 7.5z"
            fill="#111827"
          />
          <path
            fill="#111827"
            d="M15.5 24.083c-3.798 0-6.875-3.077-6.875-6.875s3.077-6.875 6.875-6.875 6.875 3.077 6.875 6.875-3.077 6.875-6.875 6.875zm0-2.3a4.575 4.575 0 100-9.15 4.575 4.575 0 000 9.15z"
          />
        </g>
        
        {/* Text */}
        <text fontFamily="Bebas Neue, sans-serif" fontSize="24" fontWeight="400" fill="#000000" x="0" y="70">
          Photographer
        </text>
        <text fontFamily="Inter, sans-serif" fontSize="22" fontWeight="300" fill="#000000" x="80" y="95" letterSpacing="1">
          Bulao
        </text>
      </g>
    </svg>
  );
}
