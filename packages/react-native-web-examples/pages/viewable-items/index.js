import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  View,
  Button
} from 'react-native';
import Example from '../../shared/example';

const ITEMS = [...Array(200)].map((_, i) => `Item ${i}`);

function createItemRow({ item, index }) {
  return (
    <Pressable key={index} style={[styles.item]}>
      <Text style={styles.text}>{item}</Text>
    </Pressable>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const viewabilityConfig = {
  itemVisiblePercentThreshold: 95
};

function onViewableItemsChanged({ viewableItems, changed }) {
  console.log('Visible items are', viewableItems);
  console.log('Changed in this iteration', changed);
}

export default function ScrollViewPage() {
  const scrollRef = React.useRef(null);
  const [isInverted, setIsInverted] = React.useState(true);

  return (
    <Example title="ViewableItems Test">
      <View style={styles.container}>
        <Button
          onPress={() => {
            setIsInverted((val) => !val);
          }}
          title={isInverted ? 'Inverted Enabled' : 'Inverted Disabled'}
        />
        <FlatList
          ItemSeparatorComponent={Divider}
          data={ITEMS}
          inverted={isInverted}
          onViewableItemsChanged={onViewableItemsChanged}
          ref={scrollRef}
          renderItem={createItemRow}
          style={styles.scrollView}
          viewabilityConfig={viewabilityConfig}
        />
      </View>
    </Example>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch'
  },
  scrollView: {
    backgroundColor: '#eeeeee',
    maxHeight: 250
  },
  item: {
    margin: 5,
    padding: 5,
    backgroundColor: '#cccccc',
    borderRadius: 3,
    minWidth: 96
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5
  },
  divider: {
    width: '1rem'
  }
});
