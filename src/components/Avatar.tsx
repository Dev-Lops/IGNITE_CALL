import { Avatar as IgniteAvatar, AvatarProps } from '@ignite-ui/react'

interface CustomAvatarProps extends AvatarProps {
  src?: string
  referrerPolicy?: string
  alt?: string
}

const Avatar: React.FC<CustomAvatarProps> = ({
  src,
  referrerPolicy,
  alt,
  ...props
}) => {
  return (
    <IgniteAvatar
      {...props}
      as="img" // assuming IgniteAvatar accepts this to render as img
      src={src}
      referrerPolicy={referrerPolicy}
      alt={alt}
    />
  )
}

export default Avatar
