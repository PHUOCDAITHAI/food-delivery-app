import { StyleSheet, Text, View, FlatList, Pressable, Image, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import HomeHeader from '../components/HomeHeader'
import {db, auth} from '../config/firebase';
import Products from '../components/Products'
import { useNavigation } from '@react-navigation/native';
const CREEN_WIDTH = Dimensions.get('window').width;
const Home = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const getProducts =  async () => {
        const products = await db.collection('Products').get();
        const productsArray = [];
        for(var snap of products.docs){
            var data = snap.data();
            data.ID = snap.id;
            productsArray.push({
                ...data
            })
            if(productsArray.length === products.docs.length){
                setProducts(productsArray);
            }
        }
    }
    useEffect(() => {
        getProducts();
    }, [])

    // AddTocart
  function GetUserUid(){
    const [uid, setUserUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if(user){
          setUserUid(user.uid)
        }
      })
    },[])
    return uid;
  }

  const uid = GetUserUid();

  let Product;
  const addToCart = (product) => {
    if(uid !== null){
      Product = product;
      Product['qty']=1;
      Product['TotalProductPrice']=Product.qty*Product.Price;
      db.collection('Cart ' + uid).doc(product.ID).set(Product).then(() => {
          alert("Thêm vào giỏ hàng thành công")
      })
    }else{
      navigation.navigate("SignIn")
    }
  }
  // End AddToCart

  
  return (
    <View style={styles.container}>
        <HomeHeader />
        <View>
            <Text>
                {products.length < 1 && "Xin vui lòng chờ...."}
            </Text>
            {products.length > 0 && <Products addToCart={addToCart} products={products} />}
        </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
      
})