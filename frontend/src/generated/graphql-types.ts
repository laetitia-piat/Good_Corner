import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Ad = {
  __typename?: 'Ad';
  category?: Maybe<Category>;
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  pictures: Array<Picture>;
  price: Scalars['Float']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
};

export type AdInput = {
  category?: InputMaybe<Scalars['ID']['input']>;
  createdAt: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  pictures?: InputMaybe<Array<PictureInput>>;
  price: Scalars['Float']['input'];
  tags?: InputMaybe<Array<TagInput>>;
  title: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type CategoryInput = {
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewAd: Ad;
  createNewCategory: Category;
  deleteAdById: Scalars['String']['output'];
  deleteCategory: Scalars['String']['output'];
  deleteTag: Scalars['String']['output'];
  updateAd: Scalars['String']['output'];
  updateCategory: Scalars['String']['output'];
  updateTag: Scalars['String']['output'];
};


export type MutationCreateNewAdArgs = {
  data: AdInput;
};


export type MutationCreateNewCategoryArgs = {
  data: CategoryInput;
};


export type MutationDeleteAdByIdArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['Float']['input'];
};


export type MutationUpdateAdArgs = {
  data: UpdateAdInput;
};


export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput;
};


export type MutationUpdateTagArgs = {
  data: UpdateTagInput;
};

export type Picture = {
  __typename?: 'Picture';
  id: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type PictureInput = {
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAdById: Ad;
  getAdsByCategory: Array<Ad>;
  getAdsByKeyWord: Array<Ad>;
  getAllAds: Array<Ad>;
  getAllCategories: Array<Category>;
  getAllTags: Array<Tag>;
  getCategoryById: Category;
  getTagById: Tag;
};


export type QueryGetAdByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetAdsByCategoryArgs = {
  categoryName: Scalars['String']['input'];
};


export type QueryGetAdsByKeyWordArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetTagByIdArgs = {
  id: Scalars['Float']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type TagInput = {
  id: Scalars['Float']['input'];
};

export type UpdateAdInput = {
  category?: InputMaybe<Scalars['ID']['input']>;
  createdAt?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  pictures?: InputMaybe<Array<PictureInput>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  tags?: InputMaybe<Array<TagInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCategoryInput = {
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type UpdateTagInput = {
  id: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type CreateNewAdMutationVariables = Exact<{
  data: AdInput;
}>;


export type CreateNewAdMutation = { __typename?: 'Mutation', createNewAd: { __typename?: 'Ad', id: number, title: string, description: string, owner: string, email: string, price: number, location: string, createdAt: string, pictures: Array<{ __typename?: 'Picture', url: string }> } };

export type CreateNewCategoryMutationVariables = Exact<{
  data: CategoryInput;
}>;


export type CreateNewCategoryMutation = { __typename?: 'Mutation', createNewCategory: { __typename?: 'Category', name: string, id: number } };

export type UpdateAdMutationVariables = Exact<{
  data: UpdateAdInput;
}>;


export type UpdateAdMutation = { __typename?: 'Mutation', updateAd: string };

export type DeleteAdByIdMutationVariables = Exact<{
  deleteAdByIdId: Scalars['Float']['input'];
}>;


export type DeleteAdByIdMutation = { __typename?: 'Mutation', deleteAdById: string };

export type GetAdsByCategoryQueryVariables = Exact<{
  categoryName: Scalars['String']['input'];
}>;


export type GetAdsByCategoryQuery = { __typename?: 'Query', getAdsByCategory: Array<{ __typename?: 'Ad', id: number, title: string, description: string, owner: string, email: string, price: number, location: string, createdAt: string, category?: { __typename?: 'Category', id: number, name: string } | null, pictures: Array<{ __typename?: 'Picture', url: string }>, tags: Array<{ __typename?: 'Tag', id: number, name: string }> }> };

export type GetAllCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoryQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: number, name: string }> };

export type GetAllAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAdsQuery = { __typename?: 'Query', getAllAds: Array<{ __typename?: 'Ad', id: number, title: string, description: string, owner: string, email: string, price: number, location: string, createdAt: string, pictures: Array<{ __typename?: 'Picture', url: string }>, category?: { __typename?: 'Category', name: string } | null, tags: Array<{ __typename?: 'Tag', id: number, name: string }> }> };

export type GetAdByIdQueryVariables = Exact<{
  getAdByIdId: Scalars['Float']['input'];
}>;


export type GetAdByIdQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: number, title: string, description: string, owner: string, email: string, price: number, location: string, createdAt: string, pictures: Array<{ __typename?: 'Picture', url: string }>, category?: { __typename?: 'Category', name: string } | null, tags: Array<{ __typename?: 'Tag', id: number, name: string }> } };

export type GetAllCategoriesAndTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesAndTagsQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: number, name: string }>, getAllTags: Array<{ __typename?: 'Tag', id: number, name: string }> };

export type GetAdsByKeyWordQueryVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAdsByKeyWordQuery = { __typename?: 'Query', getAdsByKeyWord: Array<{ __typename?: 'Ad', id: number, title: string, description: string, owner: string, email: string, price: number, location: string, createdAt: string, pictures: Array<{ __typename?: 'Picture', url: string }>, category?: { __typename?: 'Category', name: string } | null, tags: Array<{ __typename?: 'Tag', name: string }> }> };


export const CreateNewAdDocument = gql`
    mutation createNewAd($data: AdInput!) {
  createNewAd(data: $data) {
    id
    title
    description
    owner
    email
    price
    location
    createdAt
    pictures {
      url
    }
  }
}
    `;
export type CreateNewAdMutationFn = Apollo.MutationFunction<CreateNewAdMutation, CreateNewAdMutationVariables>;

/**
 * __useCreateNewAdMutation__
 *
 * To run a mutation, you first call `useCreateNewAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewAdMutation, { data, loading, error }] = useCreateNewAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewAdMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewAdMutation, CreateNewAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewAdMutation, CreateNewAdMutationVariables>(CreateNewAdDocument, options);
      }
export type CreateNewAdMutationHookResult = ReturnType<typeof useCreateNewAdMutation>;
export type CreateNewAdMutationResult = Apollo.MutationResult<CreateNewAdMutation>;
export type CreateNewAdMutationOptions = Apollo.BaseMutationOptions<CreateNewAdMutation, CreateNewAdMutationVariables>;
export const CreateNewCategoryDocument = gql`
    mutation CreateNewCategory($data: CategoryInput!) {
  createNewCategory(data: $data) {
    name
    id
  }
}
    `;
export type CreateNewCategoryMutationFn = Apollo.MutationFunction<CreateNewCategoryMutation, CreateNewCategoryMutationVariables>;

/**
 * __useCreateNewCategoryMutation__
 *
 * To run a mutation, you first call `useCreateNewCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewCategoryMutation, { data, loading, error }] = useCreateNewCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewCategoryMutation, CreateNewCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewCategoryMutation, CreateNewCategoryMutationVariables>(CreateNewCategoryDocument, options);
      }
export type CreateNewCategoryMutationHookResult = ReturnType<typeof useCreateNewCategoryMutation>;
export type CreateNewCategoryMutationResult = Apollo.MutationResult<CreateNewCategoryMutation>;
export type CreateNewCategoryMutationOptions = Apollo.BaseMutationOptions<CreateNewCategoryMutation, CreateNewCategoryMutationVariables>;
export const UpdateAdDocument = gql`
    mutation UpdateAd($data: UpdateAdInput!) {
  updateAd(data: $data)
}
    `;
export type UpdateAdMutationFn = Apollo.MutationFunction<UpdateAdMutation, UpdateAdMutationVariables>;

/**
 * __useUpdateAdMutation__
 *
 * To run a mutation, you first call `useUpdateAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdMutation, { data, loading, error }] = useUpdateAdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAdMutation, UpdateAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAdMutation, UpdateAdMutationVariables>(UpdateAdDocument, options);
      }
export type UpdateAdMutationHookResult = ReturnType<typeof useUpdateAdMutation>;
export type UpdateAdMutationResult = Apollo.MutationResult<UpdateAdMutation>;
export type UpdateAdMutationOptions = Apollo.BaseMutationOptions<UpdateAdMutation, UpdateAdMutationVariables>;
export const DeleteAdByIdDocument = gql`
    mutation DeleteAdById($deleteAdByIdId: Float!) {
  deleteAdById(id: $deleteAdByIdId)
}
    `;
export type DeleteAdByIdMutationFn = Apollo.MutationFunction<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>;

/**
 * __useDeleteAdByIdMutation__
 *
 * To run a mutation, you first call `useDeleteAdByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAdByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAdByIdMutation, { data, loading, error }] = useDeleteAdByIdMutation({
 *   variables: {
 *      deleteAdByIdId: // value for 'deleteAdByIdId'
 *   },
 * });
 */
export function useDeleteAdByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>(DeleteAdByIdDocument, options);
      }
export type DeleteAdByIdMutationHookResult = ReturnType<typeof useDeleteAdByIdMutation>;
export type DeleteAdByIdMutationResult = Apollo.MutationResult<DeleteAdByIdMutation>;
export type DeleteAdByIdMutationOptions = Apollo.BaseMutationOptions<DeleteAdByIdMutation, DeleteAdByIdMutationVariables>;
export const GetAdsByCategoryDocument = gql`
    query getAdsByCategory($categoryName: String!) {
  getAdsByCategory(categoryName: $categoryName) {
    id
    title
    description
    owner
    email
    price
    location
    createdAt
    category {
      id
      name
    }
    pictures {
      url
    }
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAdsByCategoryQuery__
 *
 * To run a query within a React component, call `useGetAdsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdsByCategoryQuery({
 *   variables: {
 *      categoryName: // value for 'categoryName'
 *   },
 * });
 */
export function useGetAdsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables> & ({ variables: GetAdsByCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>(GetAdsByCategoryDocument, options);
      }
export function useGetAdsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>(GetAdsByCategoryDocument, options);
        }
export function useGetAdsByCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>(GetAdsByCategoryDocument, options);
        }
export type GetAdsByCategoryQueryHookResult = ReturnType<typeof useGetAdsByCategoryQuery>;
export type GetAdsByCategoryLazyQueryHookResult = ReturnType<typeof useGetAdsByCategoryLazyQuery>;
export type GetAdsByCategorySuspenseQueryHookResult = ReturnType<typeof useGetAdsByCategorySuspenseQuery>;
export type GetAdsByCategoryQueryResult = Apollo.QueryResult<GetAdsByCategoryQuery, GetAdsByCategoryQueryVariables>;
export const GetAllCategoryDocument = gql`
    query getAllCategory {
  getAllCategories {
    id
    name
  }
}
    `;

/**
 * __useGetAllCategoryQuery__
 *
 * To run a query within a React component, call `useGetAllCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoryQuery, GetAllCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoryQuery, GetAllCategoryQueryVariables>(GetAllCategoryDocument, options);
      }
export function useGetAllCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoryQuery, GetAllCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoryQuery, GetAllCategoryQueryVariables>(GetAllCategoryDocument, options);
        }
export function useGetAllCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCategoryQuery, GetAllCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoryQuery, GetAllCategoryQueryVariables>(GetAllCategoryDocument, options);
        }
export type GetAllCategoryQueryHookResult = ReturnType<typeof useGetAllCategoryQuery>;
export type GetAllCategoryLazyQueryHookResult = ReturnType<typeof useGetAllCategoryLazyQuery>;
export type GetAllCategorySuspenseQueryHookResult = ReturnType<typeof useGetAllCategorySuspenseQuery>;
export type GetAllCategoryQueryResult = Apollo.QueryResult<GetAllCategoryQuery, GetAllCategoryQueryVariables>;
export const GetAllAdsDocument = gql`
    query getAllAds {
  getAllAds {
    id
    title
    description
    owner
    email
    price
    pictures {
      url
    }
    location
    createdAt
    category {
      name
    }
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAllAdsQuery__
 *
 * To run a query within a React component, call `useGetAllAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAdsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
      }
export function useGetAllAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export function useGetAllAdsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllAdsQuery, GetAllAdsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllAdsQuery, GetAllAdsQueryVariables>(GetAllAdsDocument, options);
        }
export type GetAllAdsQueryHookResult = ReturnType<typeof useGetAllAdsQuery>;
export type GetAllAdsLazyQueryHookResult = ReturnType<typeof useGetAllAdsLazyQuery>;
export type GetAllAdsSuspenseQueryHookResult = ReturnType<typeof useGetAllAdsSuspenseQuery>;
export type GetAllAdsQueryResult = Apollo.QueryResult<GetAllAdsQuery, GetAllAdsQueryVariables>;
export const GetAdByIdDocument = gql`
    query getAdById($getAdByIdId: Float!) {
  getAdById(id: $getAdByIdId) {
    id
    title
    description
    owner
    email
    price
    pictures {
      url
    }
    location
    createdAt
    category {
      name
    }
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useGetAdByIdQuery__
 *
 * To run a query within a React component, call `useGetAdByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdByIdQuery({
 *   variables: {
 *      getAdByIdId: // value for 'getAdByIdId'
 *   },
 * });
 */
export function useGetAdByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables> & ({ variables: GetAdByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
      }
export function useGetAdByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export function useGetAdByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdByIdQuery, GetAdByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdByIdQuery, GetAdByIdQueryVariables>(GetAdByIdDocument, options);
        }
export type GetAdByIdQueryHookResult = ReturnType<typeof useGetAdByIdQuery>;
export type GetAdByIdLazyQueryHookResult = ReturnType<typeof useGetAdByIdLazyQuery>;
export type GetAdByIdSuspenseQueryHookResult = ReturnType<typeof useGetAdByIdSuspenseQuery>;
export type GetAdByIdQueryResult = Apollo.QueryResult<GetAdByIdQuery, GetAdByIdQueryVariables>;
export const GetAllCategoriesAndTagsDocument = gql`
    query GetAllCategoriesAndTags {
  getAllCategories {
    id
    name
  }
  getAllTags {
    id
    name
  }
}
    `;

/**
 * __useGetAllCategoriesAndTagsQuery__
 *
 * To run a query within a React component, call `useGetAllCategoriesAndTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCategoriesAndTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCategoriesAndTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCategoriesAndTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>(GetAllCategoriesAndTagsDocument, options);
      }
export function useGetAllCategoriesAndTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>(GetAllCategoriesAndTagsDocument, options);
        }
export function useGetAllCategoriesAndTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>(GetAllCategoriesAndTagsDocument, options);
        }
export type GetAllCategoriesAndTagsQueryHookResult = ReturnType<typeof useGetAllCategoriesAndTagsQuery>;
export type GetAllCategoriesAndTagsLazyQueryHookResult = ReturnType<typeof useGetAllCategoriesAndTagsLazyQuery>;
export type GetAllCategoriesAndTagsSuspenseQueryHookResult = ReturnType<typeof useGetAllCategoriesAndTagsSuspenseQuery>;
export type GetAllCategoriesAndTagsQueryResult = Apollo.QueryResult<GetAllCategoriesAndTagsQuery, GetAllCategoriesAndTagsQueryVariables>;
export const GetAdsByKeyWordDocument = gql`
    query GetAdsByKeyWord($title: String) {
  getAdsByKeyWord(title: $title) {
    id
    title
    description
    owner
    email
    price
    pictures {
      url
    }
    location
    createdAt
    category {
      name
    }
    tags {
      name
    }
  }
}
    `;

/**
 * __useGetAdsByKeyWordQuery__
 *
 * To run a query within a React component, call `useGetAdsByKeyWordQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdsByKeyWordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdsByKeyWordQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetAdsByKeyWordQuery(baseOptions?: Apollo.QueryHookOptions<GetAdsByKeyWordQuery, GetAdsByKeyWordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdsByKeyWordQuery, GetAdsByKeyWordQueryVariables>(GetAdsByKeyWordDocument, options);
      }
export function useGetAdsByKeyWordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdsByKeyWordQuery, GetAdsByKeyWordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdsByKeyWordQuery, GetAdsByKeyWordQueryVariables>(GetAdsByKeyWordDocument, options);
        }
export function useGetAdsByKeyWordSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAdsByKeyWordQuery, GetAdsByKeyWordQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAdsByKeyWordQuery, GetAdsByKeyWordQueryVariables>(GetAdsByKeyWordDocument, options);
        }
export type GetAdsByKeyWordQueryHookResult = ReturnType<typeof useGetAdsByKeyWordQuery>;
export type GetAdsByKeyWordLazyQueryHookResult = ReturnType<typeof useGetAdsByKeyWordLazyQuery>;
export type GetAdsByKeyWordSuspenseQueryHookResult = ReturnType<typeof useGetAdsByKeyWordSuspenseQuery>;
export type GetAdsByKeyWordQueryResult = Apollo.QueryResult<GetAdsByKeyWordQuery, GetAdsByKeyWordQueryVariables>;