import { captureRejectionSymbol } from 'events';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import PouchDB from './pouchdb'
let remoteDb
let localDb
const nameIndex = {UPDATED_AT: 'index-updated_at'}
const TAG = 'App.js'

const App: () => React$Node = () => {

  console.log("in app about to load pounch db. maybe");

  const myIP = "127.0.0.1"

  remoteDb = new PouchDB(`http://user1:abc123@${myIP}:5984/house`) //not committing a secure password..
  localDb = new PouchDB('note', {adapter: 'react-native-sqlite'})

  

  console.log("pounch db loaded. maybe");

  remoteDb.createIndex({
    index: {
        fields: ['updated_at'],
        name: nameIndex.UPDATED_AT,
        ddoc: nameIndex.UPDATED_AT,
    }
  }).then((result) => {
      console.log(TAG, result)
  }).catch((err) => {
      console.log(TAG, err)
  })

  // let syncDb = () => {
  //     this.setState({isLoading: true})
  //     handlerSync = PouchDB.sync(remoteDb, localDb, {
  //         live: true,
  //         retry: true,
  //     })
  //         .on('change', (info) => {
  //             // console.log(TAG, 'sync onChange', info)
  //         })
  //         .on('paused', (err) => {
  //             // console.log(TAG, 'sync onPaused', err)
  //            // if (this.isAtCurrentScreen) {
  //                // this.getListNoteFromDb()
  //             //}
  //         })
  //         .on('active', () => {
  //             // console.log(TAG, 'sync onActive')
  //         })
  //         .on('denied', (err) => {
  //             // console.log(TAG, 'sync onDenied', err)
  //         })
  //         .on('complete', (info) => {
  //             // console.log(TAG, 'sync onComplete', info)
  //         })
  //         .on('error', (err) => {
  //             // console.log(TAG, 'sync onError', err)
  //         })
  // }
  //syncDb();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step Onje</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
