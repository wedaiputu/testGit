import React from "react";

import styled from "styled-components/native";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import Avatar from "./Avatar";
import { Text, TouchableWithoutFeedback, View } from "react-native";

const Container = styled.View`
  width: 100%;
  height: 92px;
`;
const Row = styled.View`
  flex-direction: row;
  background: #ffffff;
  width: 100%;
  padding: 0 11px;
  align-items: center;
`;
const Input = styled.TextInput`
  height: 50px;
  width: 100%;
  padding: 0 8px;
`;
const Divider = styled.View`
  width: 100%;
  height: 0.5px;
  background: #f0f0f0;
`;
const Menu = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 42px;
`;
const MenuText = styled.Text`
  padding-left: 11px;
  font-weight: 500;
  font-size: 12px;
`;
const Separator = styled.View`
  width: 1px;
  height: 26px;
  background: #f0f0f0;
`;
const BottomDivider = styled.View`
  width: 100%;
  height: 9px;
  background: #f0f2f5;
`;

export default function ProfileBar({ navigation }){
  return (
    <>
      <Container>
        <Row>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("UserDetail")}
          >
            <View
              style={{
                padding: 5,
              }}
            >
              <Avatar source={require("../assets/user1.jpg")} />
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              What's on your mind?
            </Text>
          </View>
        </Row>
        <Divider />
      </Container>
      <BottomDivider />
    </>
  );
};

