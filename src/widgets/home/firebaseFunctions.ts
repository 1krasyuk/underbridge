import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  DocumentSnapshot,
  QuerySnapshot,
  CollectionReference,
  Query
} from 'firebase/firestore'

// Функция для загрузки данных с учетом фильтров и пагинации
export async function loadData(
  category: string,
  price: number,
  size: string,
  limitPerPage: number,
  lastVisible?: QueryDocumentSnapshot<DocumentData>
) {
  const db = getFirestore()
  let dataQuery: Query<DocumentData> | CollectionReference<DocumentData> // явное указание типа

  dataQuery = collection(db, 'products')

  if (category) {
    dataQuery = query(
      dataQuery,
      where('category', '==', category)
    ) as Query<DocumentData>
  }
  if (price) {
    dataQuery = query(
      dataQuery,
      where('price', '>=', price)
    ) as Query<DocumentData>
  }
  if (size) {
    dataQuery = query(
      dataQuery,
      where('size', '==', size)
    ) as Query<DocumentData>
  }

  dataQuery = query(dataQuery, orderBy('createdAt', 'desc'))

  if (lastVisible) {
    dataQuery = query(dataQuery, startAfter(lastVisible)) as Query<DocumentData>
  }

  dataQuery = query(dataQuery, limit(limitPerPage))

  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(
    dataQuery as Query<DocumentData>
  )

  return {
    data: querySnapshot.docs.map((doc: DocumentSnapshot<DocumentData>) =>
      doc.data()
    ),
    lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1]
  }
}
