import React from 'react'

import googleFocus from 'src/assets/btn_google_signin_light_focus_web.png'
import googleSrc from 'src/assets/btn_google_signin_light_normal_web.png'
import googlePressed from 'src/assets/btn_google_signin_light_pressed_web.png'

export interface AuthProviderProps {
  name: string;
  url: string;
}

interface ImageSource {
  src: string;
  hover: string;
  pressed: string;
}
const imageSources: Record<string, ImageSource> = {
  google: {
    src: googleSrc,
    hover: googleFocus,
    pressed: googlePressed,
  },
}

const AuthProviderButton: React.FC<AuthProviderProps> = ({ name, url }) => {
  const images = imageSources[name]

  return (
    <a href={url} key={name}>
      <img
        alt={name}
        src={images.src}
        onMouseEnter={(e) => { e.currentTarget.src = images.hover }}
        onMouseOut={(e) => { e.currentTarget.src = images.src }}
        onMouseDown={(e) => { e.currentTarget.src = images.pressed }}
        onMouseUp={(e) => { e.currentTarget.src = images.src }}
      />
    </a>
  )
}

export { AuthProviderButton }
