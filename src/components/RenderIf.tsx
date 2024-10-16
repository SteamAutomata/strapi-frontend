import { ReactNode } from "react"

/**
 * Afficher le composant si la dépendance n'est pas nulle, sinon afficher un composant fallback.
 */
export default function RenderIf<T>(props: {
  fallback: ReactNode
  dependency: T
  render: (dep: NonNullable<T>) => ReactNode
}) {
  return props.dependency ? props.render(props.dependency) : props.fallback
}
