import Order from 'models/order.model'
import to from 'await-to-js'

//TODO: Implement the following functions (Hint: look at order.controller.js)

/**
 * .lean() returns an object rather than the mongoose document
 * this makes queries faster, but you cannot modify the returned result
 *
 *
 */

export const getOrders = async (req, res) => {
  const [error, orders] = await to(Order.find({}).lean())
  if (error) return res.status(500).send({ error })

  return res.json({ orders })
}

export const getOrder = async (req, res) => {
  const { id } = req.params
  const [error, order] = await to(Order.findById(id).lean())
  if (error) return res.status(500).send({ error })

  return res.json({ order })
}

export const createOrder = async (req, res) => {
    const { productName, quantity } = req.body
    if (!productName) return res.status(400).send({ error: 'productName required' })
  
    const [error, order] = await to(Order.create({ productName, quantity }))
    if (error) return res.status(500).send({ error })
    return res.json({ order })
  }

export const updateOrder = async (req, res) => {
  const { id } = req.params
  const { productName, quantity } = req.body
  const [error, order] = await to(
    Order.findByIdAndUpdate(
      id,
      { productName, quantity },
      { returnDocument: 'after' }
    ).lean()
  )
  if (error) return res.status(500).send({ error })
  return res.json({ order })
}

export const deleteOrder = async (req, res) => {
  const { id } = req.params
  const [error, order] = await to(Order.findByIdAndDelete(id).lean())
  if (error) return res.status(500).send({ error })
  return res.json({ order })
}
