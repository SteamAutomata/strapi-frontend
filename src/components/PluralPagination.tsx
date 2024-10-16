import { Pagination } from "react-bootstrap"

/** Pagination sous forme de [<][1][2][n][>] */
export default function PluralPagination(props: {
  current: number
  count: number
}) {
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />

      {Array.from({ length: props.count }, (_, i) => i + 1).map(i => (
        <Pagination.Item key={i} active={props.current === i}>
          {i}
        </Pagination.Item>
      ))}

      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  )
}
