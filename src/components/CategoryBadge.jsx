import styles from "./CategoryBadge.module.css"
import { Badge } from "react-bootstrap"
function CategoryBadge({category}) {
  return (
    <Badge bg="undefined" className={styles["beer-badge"]} key={category.slug}>{category.name}</Badge>
  )
}

export default CategoryBadge