import React, { useContext, useEffect, useState } from "react";

import { StatusBar, ScrollView, Text } from "react-native";

import styled from "styled-components/native";

import AppBar from "../components/AppBar";
import ToolBar from "../components/ToolBar";
import Users from "../components/Users";
import Story from "../components/Story";
import Feed from '../components/Feed'
import { useQuery } from "@apollo/client";
import { POSTS } from "../queries/gql";



const Container = styled.SafeAreaView`
  flex: 1;
`;

export default function HomeScreen({ navigation }) {
  const [feeds, setFeeds] = useState([]);
  const { data } = useQuery(POSTS);

  console.log(data);
  
  useEffect(()=>{
  	if(data){
  		setFeeds(data.posts)
  	}
  }, [data])

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Container>
        <ScrollView>
          <AppBar />
          <ToolBar navigation={navigation} />
          <Users />
          <Story />
          {feeds.map(el=> {
					return <Feed navigation={navigation} el={el}/>
					})}
          {/* {feeds ? (
            feeds.map((el) => (
              <Feed key={el._id} navigation={navigation} el={el} />
            ))
          ) : (
            <Text>No posts available.</Text>
          )} */}
          {/* <Feed/> */}
        </ScrollView>
      </Container>
    </>
  );
}
