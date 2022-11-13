import moment from 'moment';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  useWindowDimensions,
} from 'react-native';
import styled from 'styled-components';
import Markdown from 'react-native-markdown-renderer';

const HeaderInfo = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;
  padding: 12px 0;
  border-bottom-width: 1px;
`;

const RowView = styled.View`
  width: 100%;
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
  flex: 1;
  padding-right: 12px;
  margin-bottom: 4px;
`;

const IssueCommentCount = styled.Text`
  width: 90px;
`;

const Body = styled.View`
  padding: 24px;
`;

export const Detail = (props: any) => {
  const {route} = props;
  const [issueInfo, setIssueInfo] = useState<any>();
  useState(() => {
    if (!route?.params?.issue) {
      // error
      return;
    }
    setIssueInfo(route?.params?.issue);
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <RowView style={{alignItems: 'center'}}>
          <Image
            source={{uri: issueInfo?.user?.avatar_url}}
            style={{width: 40, height: 40, margin: 12}}
          />
          <HeaderInfo>
            <ColView>
              <RowView>
                <IssueNumber>#{issueInfo?.number}</IssueNumber>
                <IssueTitle>{issueInfo?.title}</IssueTitle>
              </RowView>
              <RowView>
                <Text>작성자: {issueInfo?.user?.login}, </Text>
                <Text>
                  작성일:{' '}
                  {moment(issueInfo?.created_at).format('yyyy년 M월 D일')}
                </Text>
              </RowView>
            </ColView>
            <IssueCommentCount>
              코멘트 : {issueInfo?.comments}
            </IssueCommentCount>
          </HeaderInfo>
        </RowView>
        <Body>
          <Markdown>{issueInfo?.body}</Markdown>
        </Body>
      </ScrollView>
    </SafeAreaView>
  );
};
