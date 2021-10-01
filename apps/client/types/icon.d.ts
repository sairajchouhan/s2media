export interface IconProps extends React.SVGProps<SVGSVGElement> {
  w?: string
  h?: string
  color?: string
}

export interface LeftNavIconProps extends IconProps {
  variant?: 'solid' | 'outline'
  styling?: string
}

// eslint-disable-next-line no-unused-vars
export type LeftNavIconComp = (props: LeftNavIconProps) => JSX.Element
