import React, { useEffect } from "react";
import axios from 'axios';
import Layout from "./Layout/Layout";
import Routes from "./Routes";




export default function App() {

  const [disassembled, setDisassembled] = React.useState('')
  const [pageNum, setPageNum] = React.useState(1)
  const [hasMore, setHasMore] = React.useState(true)
  const [myData, setMyData] = React.useState();

  

  return (
    <div>
      <Layout>
        <Routes />
      </Layout>
    </div>
  )
}

