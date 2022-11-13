import React, {useEffect, useState} from 'react';
import {
  Linking,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {getOpenIssueListSortByComment} from '../api';
import styled from 'styled-components/native';
import moment from 'moment';
import {Link} from '@react-navigation/native';

const List = styled.FlatList`
  display: flex;
  padding: 0 20px;
  background-color: #ffffff;
`;

const ListItem = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 12px 0;
  border-bottom-width: 1px;
`;

const RowView = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ColView = styled.View`
  display: flex;
  flex-direction: column;
`;

const IssueNumber = styled.Text`
  margin-right: 8px;
  width: 60px;
`;

const IssueTitle = styled.Text`
  width: 60%;
  margin-bottom: 4px;
`;

const IssueCommentCount = styled.Text`
  width: 90px;
`;

const AdBanner = styled.Image`
  width: 100%;
  height: 48px;
  margin: 12px 0;
`;

export const Home = (props: any) => {
  const {navigation} = props;

  const [issueList, setIssueList] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState<boolean>(false);

  const init = async () => {
    const getListResult = await getOpenIssueListSortByComment(
      'angular',
      'angular-cli',
      page,
    );

    if (Array.isArray(getListResult) === false || getListResult?.length === 0) {
      // error 발생
      return;
    }

    setIssueList(issueList.concat(getListResult));
    setRefresh(false);
  };

  useEffect(() => {
    init();
  }, [page]);

  return (
    <SafeAreaView>
      <List
        data={issueList}
        onEndReached={e => setPage(page + 1)}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              init();
            }}
          />
        }
        renderItem={({item, index}) => {
          if (index === 4) {
            return (
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://thingsflow.com/ko/home')
                }>
                <AdBanner
                  source={{
                    uri: 'https://hellobot-test.s3.ap-northeast-2.amazonaws.com/image/01fdd797-0477-4717-8d70-8551150463f7',
                  }}
                />
              </TouchableOpacity>
            );
          }
          return (
            <ListItem
              key={index}
              onPress={() => navigation.push('detail', {issue: item})}>
              <ColView>
                <RowView>
                  <IssueNumber>#{item?.number}</IssueNumber>
                  <IssueTitle>{item?.title}</IssueTitle>
                </RowView>
                <RowView>
                  <Text>작성자: {item?.user?.login}, </Text>
                  <Text>
                    작성일: {moment(item?.created_at).format('yyyy년 M월 D일')}
                  </Text>
                </RowView>
              </ColView>
              <IssueCommentCount>코멘트 : {item?.comments}12</IssueCommentCount>
            </ListItem>
          );
        }}
      />
    </SafeAreaView>
  );
};
