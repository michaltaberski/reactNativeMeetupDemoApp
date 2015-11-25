import React from 'react-native';
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} = React;

class MeetupJsDemo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      error: null,
    };
  }

  componentDidMount() {
    fetch('https://api.github.com/search/repositories?q=tetris')
      .then((response) => response.text() )
      .then((bodyString) => JSON.parse(bodyString) )
      .then((jsonData) => {
        let data = jsonData.items.map((item) => item.owner);
        this.setState(Object.assign({}, this.state, {
          loading: false,
          data,
        }));
      })
      .catch(() => {
        this.setState(Object.assign({}, this.state, {
          loading: false,
          error: 'Error',
        }));
      })
  }

  render() {
    let { loading, data, error } = this.state;
    return (
      <ScrollView style={{padding: 20}}>
        { loading && <Text>Loading...</Text> }
        { error && <Text>{error}</Text> }
        {
          data.map((user) => {
            return (
              <View>
                <Image
                  source={{uri: user.avatar_url}}
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
                <Text>{ user.login }</Text>
              </View>
            )
          })
        }
      </ScrollView>
    );
  }
};

AppRegistry.registerComponent('meetupJsDemo', () => MeetupJsDemo) ;
