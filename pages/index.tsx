import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { FC, useState } from 'react'
import { useStore } from '../src/store'
import { observer } from 'mobx-react-lite'

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <Title />
      <Form />
      <Transactions />
      <Blocks />
    </main>
  )
}

const Title: FC = observer(() => {
  const store = useStore()

  return (
    <h1>
      {store.numberBlocks} Blocks ({store.valid ? 'Valid' : 'Invalid'})
    </h1>
  )
})

const Form: FC = () => {
  const store = useStore()
  const [message, setMessage] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        store.addTransaction(message)
        setMessage('')
      }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="message"
        required
      />
      <button type="submit">Add</button>
    </form>
  )
}

const Transactions: FC = observer(() => {
  const store = useStore()

  return store.transactions.length > 0 ? (
    <div>
      <h2>Pending Transactions</h2>
      <ul className="pending">
        {store.transactions.map((transaction, idx) => (
          <li key={idx}>{transaction}</li>
        ))}
      </ul>
    </div>
  ) : null
})

const Blocks: FC = observer(() => {
  const store = useStore()

  return (
    <div>
      <h2>Blocks</h2>
      <ul className={styles.block}>
        {[...store.blocks].reverse().map((block) => (
          <li key={block.hash}>
            <h3>{block.hash}</h3>
            <pre>{JSON.stringify(block.transactions, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  )
})

export default Home
