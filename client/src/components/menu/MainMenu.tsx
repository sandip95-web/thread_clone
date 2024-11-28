import { Menu, MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { toggleMainMenu } from '../../redux/slice'

const MainMenu = () => {
  const{anchorE1}=useSelector((state:RootState)=>state.service)
  const dispatch=useDispatch();
  const handleToggleTheme=()=>{}
  const handleClose=()=>{
    dispatch(toggleMainMenu(null))
  };
  const handleLogout=()=>{};
  console.log("Here:",anchorE1 == null)

  return (
    <>
     <Menu
        anchorEl={anchorE1}
        open={anchorE1 !== null ? true : false}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleToggleTheme}>Toggle Theme</MenuItem>
        <Link to={`/profile/threads/1`} className="link">
          <MenuItem>My Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu> 
    </>
  )
}

export default MainMenu
