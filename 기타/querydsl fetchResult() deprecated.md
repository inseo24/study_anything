querydsl에 fetchResult()는 쿼리가 조금만 복잡해지면(groupby 등 사용) count 계산이 제대로 안되는 문제가 있어서 deprecated 됐다고 함.
그래서 조회하는 쿼리는 fetch로 쓰고 count 쿼리는 따로 빼서 totalCount는 따로 써야한다고 함

이 부분 관련해서 아직 정확히는 잘 모르겠는데 일단 fetchResult() 빼고 fetch()로 조회하고 count 쿼리도 따로 뺐다. 
나중에 좀 더 공부해보자