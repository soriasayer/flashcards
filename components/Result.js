import React, { Component } from 'react'
import { StyleSheet,
    View,
    Text } from 'react-native'
import { white, yellow, green, red, gray, lightGreen } from '../utils/colors'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { MaterialCommunityIcons} from '@expo/vector-icons'
import Pie from 'react-native-pie'

class Result extends Component {

    
    render () {
        const chart_wh = 250
        const series = [123, 321, 123, 789, 537]
        const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
        return(
            <View style={styles.container}>
            <View
              style={{
                paddingVertical: 15,
                flexDirection: 'row',
                width: 350,
                justifyContent: 'space-between',
              }}
            >
              <Pie
                radius={80}
                sections={[
                  {
                    percentage: 10,
                    color: '#C70039',
                  },
                  {
                    percentage: 20,
                    color: '#44CD40',
                  },
                  {
                    percentage: 30,
                    color: '#404FCD',
                  },
                  {
                    percentage: 40,
                    color: '#EBD22F',
                  },
                ]}
                strokeCap={'butt'}
              />
              <Pie
                radius={80}
                innerRadius={50}
                sections={[
                  {
                    percentage: 10,
                    color: '#C70039',
                  },
                  {
                    percentage: 20,
                    color: '#44CD40',
                  },
                  {
                    percentage: 30,
                    color: '#404FCD',
                  },
                  {
                    percentage: 40,
                    color: '#EBD22F',
                  },
                ]}
                strokeCap={'butt'}
              />
            </View>
            <View
              style={{
                paddingVertical: 15,
                flexDirection: 'row',
                width: 350,
                justifyContent: 'space-between',
              }}
            >
              <Pie
                radius={80}
                innerRadius={60}
                sections={[
                  {
                    percentage: 10,
                    color: '#C70039',
                  },
                  {
                    percentage: 20,
                    color: '#44CD40',
                  },
                  {
                    percentage: 30,
                    color: '#404FCD',
                  },
                  {
                    percentage: 40,
                    color: '#EBD22F',
                  },
                ]}
                dividerSize={4}
                strokeCap={'round'}
              />
              <Pie
                radius={80}
                innerRadius={60}
                sections={[
                  {
                    percentage: 10,
                    color: '#C70039',
                  },
                  {
                    percentage: 20,
                    color: '#44CD40',
                  },
                  {
                    percentage: 30,
                    color: '#404FCD',
                  },
                  {
                    percentage: 40,
                    color: '#EBD22F',
                  },
                ]}
                dividerSize={6}
                strokeCap={'butt'}
              />
            </View>
            <View
              style={{
                paddingVertical: 15,
                width: 350,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Pie
                radius={80}
                sections={[
                  {
                    percentage: 10,
                    color: '#C70039',
                  },
                  {
                    percentage: 20,
                    color: '#44CD40',
                  },
                  {
                    percentage: 30,
                    color: '#404FCD',
                  },
                  {
                    percentage: 40,
                    color: '#EBD22F',
                  },
                ]}
                dividerSize={6}
                strokeCap={'butt'}
              />
              <View style={{ width: 175, alignItems: 'center' }}>
                <Pie
                  radius={80}
                  innerRadius={75}
                  sections={[
                    {
                      percentage: 60,
                      color: '#f00',
                    },
                  ]}
                  backgroundColor="#ddd"
                />
                <View
                  style={styles.gauge}
                >
                  <Text
                    style={styles.gaugeText}
                  >
                    60%
                  </Text>
                </View>
              </View>
            </View>
          </View>
  
        )
    }
}


export default Result

const styles = StyleSheet.create({
  
    
    container: { alignItems: 'center', justifyContent: 'center', height: 1050 },
  gauge: {
    position: 'absolute',
    width: 100,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 24,
  },
    
})