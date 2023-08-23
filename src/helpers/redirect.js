import {
  useRouter
} from 'vue-router'


const redirect = (path) => {
  const router = useRouter()
  //router.push(path)

  location.href = path;
}


export default redirect;
