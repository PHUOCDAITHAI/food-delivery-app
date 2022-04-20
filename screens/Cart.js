import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { auth, db } from '../config/firebase';
import { Icon, Button } from 'react-native-elements';
import {colors, parameters} from "../global/styles";
import { useNavigation } from '@react-navigation/native';
import CartProduct from '../components/CartProduct';
import StripeCheckout from 'react-stripe-checkout'
import CashOnDelivery from './CashOnDelivery';
const Cart = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  // const [addressRestaurant, setAddressRestaurant] = useState(null);
  // const [latRestaurant, setLatRestaurant] = useState(null);
  // const [lngRestaurant, setLngRestaurant] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
        if(user){
            db.collection('Cart ' + user.uid).onSnapshot(snapshot => {
            const newCartProduct = snapshot.docs.map((doc) => ({
                ID: doc.id,
                ...doc.data(), 
            }))
            setCartProducts(newCartProduct)
            })
        }else { 
            console.log('user is not signed in to retrieve cart');
        }
        }) 
    }, [])
    const [totalProducts, setTotalProducts] = useState(0);
    useEffect(() => {
      auth.onAuthStateChanged(user => {
          if(user){
              db.collection('Cart ' + user.uid).onSnapshot(snapshot => {
                  const totalQty = snapshot.docs.length;
                  setTotalProducts(totalQty);
              })
          }else {
              console.log("Chua dang nhap")
          }
      }) 
    }, [])

    let Product;
    const cartProductIncrease = (cartProduct) => {
        Product = cartProduct;
        Product.qty = Product.qty + 1;
        Product.TotalProductPrice = Product.qty*Product.Price;
        auth.onAuthStateChanged(user => {
            if(user){
                db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(() => {
                    console.log('increment added');
                })
            }else{
                console.log("Chua dang nhap")
            }
        })
    }

    // Product Increase

    // Product Decrease
    const cartProductDecrease = (cartProduct) => {
        Product = cartProduct;
        if(Product.qty > 1){
          Product.qty = Product.qty - 1;
          Product.TotalProductPrice=Product.qty*Product.Price;
          auth.onAuthStateChanged(user => {
            if(user){
              db.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(() => {
                console.log('decrement');
              })
            }else {
              console.log('user is not logged in to decrement')
            }
          })
        }
      }

    // Product Decrease

    // TotalProductPrice
    const price = cartProducts.map((cartProduct) => {
      return cartProduct.TotalProductPrice;
    })
  const reducerOfPrice = (accumulator, currentValue) => accumulator+currentValue;
  const totalPrice = price.reduce(reducerOfPrice, 0)

  // TotalProductPrice

  // TotalQty
  const qty = cartProducts.map(cartProduct => {
      return cartProduct.qty;
  })

  const reducerQty = (accumulator, currentValue) => accumulator + currentValue;

  const totalQty = qty.reduce(reducerQty, 0)

  // TotalQty

  const handleToken = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{alignItems: "center", justifyContent: "center", marginLeft: 15}}>
          <Icon 
              type='material-community'
              name='arrow-left'
              color={colors.headerText}
              size={28}
              onPress={() => {
                navigation.goBack()
              }}
            />
        </View>

        <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text style={{color: colors.cardbackground, fontSize: 25, fontWeight: "bold"}}>Chi tiết đơn hàng</Text>
        </View>

        <View style={{alignItems: "center", justifyContent: "center", marginRight: 15}}>
            
        </View>
       
      </View>
      <View style={styles.headerTextView}>
          <Text style={styles.headerText}>Tóm tắt đơn hàng</Text>
      </View>
      {cartProducts.length > 0 && (
        <CartProduct 
          totalProducts={totalProducts} 
          cartProducts={cartProducts} 
          cartProductIncrease={cartProductIncrease}
          cartProductDecrease={cartProductDecrease}
        />
      )}
      {cartProducts.length < 1 && (
        <View style={{marginHorizontal: 10}}>
          <Text style={{fontSize: 20}}>Chưa có đơn đặt hàng ...</Text>
        </View>
      )}
      
      <View style={styles.cash}>
        <View style={styles.sumCart}>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 18}}>Tổng số sản phẩm: {totalQty}</Text>
          </View>
          
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 18}}>Tổng cộng: {totalPrice} ₫</Text>
          </View>
        </View>
        <Button 
          title="Thanh toán khi giao hàng"
          buttonStyle={{marginHorizontal: 20}}
          onPress={() => {
            navigation.navigate("PaymentMethod", {totalQty: totalQty, totalPrice: totalPrice})
          }}
        />
        <View style={{marginTop: 10}}>
          <Button 
            title="Thanh toán bằng thẻ"
            buttonStyle={{marginHorizontal: 20}}
            onPress={() => {
              navigation.navigate("PayWithCard", {totalQty: totalQty, totalPrice: totalPrice})
            }}
          />
        </View>
      </View>
      
      
      <View>
        {showModal && (
          <CashOnDelivery />
        )}
        
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  header: {
    flexDirection: "row",
    backgroundColor: colors.buttons,
    height: parameters.headerHeight,
    justifyContent: "space-between"
  },
  headerText: {
    color: colors.grey2,
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 10,
},
headerTextView: {
    backgroundColor: colors.grey5,
    paddingVertical: 2,
    marginTop: 10,
    marginBottom: 10,        
},
cash: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    zIndex: 1,
    // backgroundColor: "red",
},
CashOnDelivery: {
  backgroundColor: "blue",
  color: "white",
  fontSize: 18,
  marginHorizontal: 20,
  borderRadius: 20,
  paddingHorizontal: 20,
  fontWeight: "bold"
},
sumCart: {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 100
}
})