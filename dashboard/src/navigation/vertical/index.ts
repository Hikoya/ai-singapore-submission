// ** Icon imports
// import Comment from 'mdi-material-ui/Comment'
import HomeOutline from 'mdi-material-ui/HomeOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    }

    /*
    {
      title: 'Comments',
      icon: Comment,
      path: '/comments'
    }*/
  ]
}

export default navigation
