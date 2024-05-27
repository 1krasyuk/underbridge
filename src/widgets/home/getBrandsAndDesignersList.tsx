import { collection, getDocs } from 'firebase/firestore'
import { db } from 'firebase' // Импортируйте ваш экспортированный объект db из файла firebaseConfig

const getBrandsAndDesignersList = async () => {
  const brandsRef = collection(db, 'brandsAndDesignersList')
  const brandsSnapshot = await getDocs(brandsRef)
  const brandsList = brandsSnapshot.docs.map((doc) => doc.data())
  return brandsList
}

export default getBrandsAndDesignersList
