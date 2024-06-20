import { collection, getDocs } from 'firebase/firestore'
import { db } from 'firebase' // Импортируйте ваш экспортированный объект db из файла firebaseConfig

const getColorsList = async () => {
  const colorsRef = collection(db, 'colorsList')
  const colorsSnapshot = await getDocs(colorsRef)
  const colorsList = colorsSnapshot.docs.map((doc) => doc.data())
  return colorsList
}

export default getColorsList
