import React, { Component } from 'react';
import { ScrollView, Platform, Alert } from 'react-native';
import { Content, List, ListItem, Left, Body, Right, Text } from 'native-base';
import TabBarIcon from '../components/TabBarIcon';
import { dataDefaults, icon, popup } from '../constants/Data';

export default class LinksComponent extends Component {
  state = {
    data: [],
    respBody: {}
  };

  modal(status) {
    Alert.alert(
      '',
      popup(status),
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: true }
    );
  }

  render() {
    const data = this.props.tickets.length > 0 ? this.props.tickets : dataDefaults;

    return (
      <ScrollView>
        <Content>
          <List>
            {data.map((item, index) => {
              return (
                <ListItem key={index} onPress={() => this.modal(item.status)} avatar>
                  <Left>
                    <TabBarIcon
                      name={
                        Platform.OS === 'ios'
                          ? `ios-${icon(item.status)}`
                          : `md-${icon(item.status)}`
                      }
                    />
                  </Left>

                  <Body>
                    <Text note>{item.name}</Text>
                  </Body>
                  <Right>
                    <Text note>{item.date}</Text>
                  </Right>
                </ListItem>
              )
            })}

          </List>
        </Content>
      </ScrollView>
    );
  }
}


LinksComponent.navigationOptions = {
  title: 'History',
};
