import { useState } from "react"
import styles from "./SearchBar.module.css"

function SearchBar({searchList}) {
  // suggestion try without own state for searchValue.
  const [searchValue, setSearchValue] = useState("")
  const handleSubmit = e => {
    e.preventDefault()
    searchList(searchValue)
  }
  // try without form tag
  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Type to search..."/>
    </form>
  )
}

export default SearchBar;