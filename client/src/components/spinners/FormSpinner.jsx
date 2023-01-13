import { Oval } from  'react-loader-spinner'

export default function FormSpinner({color, bgcolor}) {
  return (
    <Oval 
    ariaLabel="loading-indicator"
    height={300}
    width={300}
    strokeWidth={4}
    strokeWidthSecondary={2}
    color={color}
    secondaryColor={bgcolor}
    />
  )
}
