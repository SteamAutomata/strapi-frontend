import { useEffect, useState } from "react"
import { fetchAPI, retrieveMedia } from "./api-helper"

import { Card } from "react-bootstrap"
import { Strapi } from "./strapitypes"
import PluralPagination from "./components/PluralPagination"
import RenderIf from "./components/RenderIf"

interface StrapiArticle extends Strapi.Component {
  title: string
  description: string
  slug: string
  cover: Strapi.Image
}

function ArticleCard(props: {
  title: string
  cover: string
  desc: string
  className?: string
}) {
  return (
    <Card style={{ width: "18rem" }} className={props.className}>
      <Card.Img variant="top" src={retrieveMedia(props.cover)} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.desc}</Card.Text>
      </Card.Body>
    </Card>
  )
}

function Loading() {
  return <h2>🌀 Loading...</h2>
}

function App() {
  const [articles, setArticles] = useState(
    undefined as StrapiArticle[] | undefined
  )
  const [pagination, setPagination] = useState(
    undefined as Strapi.Pagination | undefined
  )

  async function fetchArticles() {
    const result = await fetchAPI("/articles", {
      populate: ["cover"]
    })
    setArticles(result.data)
    setPagination(result.meta.pagination)
  }

  function MapArticles() {
    return (
      <div className="container text-center row row-cols-3">
        {articles!.map((article, i) => (
          <ArticleCard
            key={i}
            className="col"
            // certains articles peuvent ne pas avoir d'image de couverture
            cover={article.cover ? article.cover.url : ""}
            desc={article.description}
            title={article.title}
          />
        ))}
      </div>
    )
  }

  useEffect(() => {
    fetchArticles()

    // Pour obtenir les articles (presque) en temps réel
    const unsubscribe = setInterval(fetchArticles, 50_000)
    return () => clearInterval(unsubscribe)
  }, [])

  return (
    <>
      <RenderIf
        dependency={articles}
        fallback={<Loading />}
        render={MapArticles}
      />

      <RenderIf
        dependency={pagination}
        fallback={<Loading />}
        render={pagination => (
          <PluralPagination
            count={pagination.pageCount}
            current={pagination.page}
          />
        )}
      />
    </>
  )
}

export default App
