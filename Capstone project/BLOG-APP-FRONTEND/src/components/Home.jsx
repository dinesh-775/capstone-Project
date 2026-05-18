import { all } from "axios";
import { useArticles, useAuth } from "../store/authStore";
import { useEffect } from "react";
import {
    articleCard,
    articlesTitle,
    articleAuthor,
    articleContent,
    articlesGrid,
    viewBtn

} from "../common";

function Home() {
    const { allArticles, readArticles } = useArticles();
    
    useEffect(() => {
        readArticles();
    }, [])
    return (
        <div className={articlesGrid}>
            {
                allArticles.map((ele, index) => (
                    <div key={index} className={articleCard}>
                        <h1 className={articleAuthor}>{ele.author.firstName}</h1>
                        <p className={articlesTitle}>{ele.title}</p>
                        <p className={articleContent}>{ele.content}</p>
                        <button className={viewBtn}>View</button>
                    </div>
                ))
            }
        </div>

    )

}
export default Home;