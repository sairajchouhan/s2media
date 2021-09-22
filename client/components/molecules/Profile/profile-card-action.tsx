import { useAuth } from '../../../context/authContext'
import { BaseUser } from '../../../types'
import { Button } from '../../atoms/Button'
export const ProfileCardAction = ({
  profileUser,
  toggleOpen,
}: {
  profileUser: BaseUser
  toggleOpen: () => void
}) => {
  const { user } = useAuth()
  return user?.username === profileUser.username ? (
    <Button variant="outline" colorScheme="gray" onClick={toggleOpen}>
      Edit Profile
    </Button>
  ) : (
    <div>
      <Button>Follow</Button>
    </div>
  )
}
