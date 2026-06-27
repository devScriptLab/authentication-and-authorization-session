import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: true,
  }

  componentDidMount = () => {
    this.getProduct()
  }

  getProduct = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/products'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))

      this.setState({productsList: updatedData, isLoading: false})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#9fcfe1" width={50} height={50} />
    </div>
  )

  renderProductsList = () => {
    const {productsList, isLoading} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <ul className="products-list">
            {productsList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
