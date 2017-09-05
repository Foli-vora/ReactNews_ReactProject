
import React,{Component,PropTypes} from 'react'
import axios from 'axios'
import {Card} from 'antd'
import {Link} from 'react-router'

export default class NewsBlock extends Component{

    static  propTypes = {
        type: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired
    }

    state = {
        newsArr: null
    }

    componentDidMount () {
        const {type,count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response => {
                const newsArr = response.data.map(({uniquekey,title}) => ({uniquekey,title}))
                this.setState({newsArr})
            })
    }

    render () {
        const {newsArr} = this.state
        const contentUI = !newsArr
            ? <h2>没有任何新闻</h2>
            : (
                <ul>
                    {
                        newsArr.map((item,index) => (
                            <li key={index}>
                                <Link to={`/news_detail/${item.uniquekey}`}>{item.title}</Link>
                            </li>
                        ))
                    }
                </ul>
              )
        return (
            <Card className="topNewsList">
                {contentUI}
            </Card>
        )
    }
}
