import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Styled from 'styled-components';
import { AuthContext } from '../App';
import {
	Card,
	Icon,
	Image,
	Container,
	Button,
	List,
	Grid,
	Pagination,
} from 'semantic-ui-react';

export default function Home() {
	const { state, dispatch } = useContext(AuthContext);
	const [repos, setRepos] = useState([]);
	const [events, setEvents] = useState([]);
	const [pageNo, setPageNo] = useState(1);

	useEffect(() => {
		if (state.isLoggedIn) {
			fetch(`${state.user.repos_url}?page=${pageNo}&per_page=10`, {
				method: 'GET',
			})
				.then((response) => response.json())
				.then((data) => {
					setRepos(data);

					// Storing events for each repos and play around with it as per one's requirements
					// since mine's pretty much an empty array for every repo there's nothing to diplay on the dashboard
					data.forEach((repo) => {
						fetch(repo.events_url, {
							method: 'GET',
						})
							.then((response) => response.json())
							.then((data) => {
								setEvents(data);
							})
							.catch((error) => {
								console.log(error);
							});
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [state, pageNo]);

	if (!state.isLoggedIn) {
		return <Navigate to='/login' />;
	}
	const {
		avatar_url,
		name,
		public_repos,
		followers,
		following,
		bio,
		location,
	} = state.user;

	const handleLogout = () => {
		dispatch({
			type: 'LOGOUT',
		});
	};

	const handlePageChange = (e) => {
		const page = e.target.getAttribute('value');
		setPageNo(page);
	};

	const totalPages = Math.ceil(public_repos % 10);

	return (
		<Container>
			<Wrapper>
				<div className='profile-card'>
					<Grid>
						<Grid.Row>
							<Grid.Column width={5}>
								<Card>
									<Image
										src={avatar_url}
										wrapped
										ui={false}
									/>
									<Card.Content>
										<Card.Header>{name}</Card.Header>
										<Card.Meta>
											<span className='date'>
												Joined in 2015
											</span>
										</Card.Meta>
										<Card.Description>
											{bio}
										</Card.Description>
									</Card.Content>
									<Card.Content extra>
										<p>
											<Icon name='github' />
											{public_repos} Repositories
										</p>
										<p>
											<Icon name='user' />
											{followers} followers
										</p>
										<p>
											<Icon name='user' />
											{following} Following
										</p>
										<p>
											<Icon name='marker' />
											{location}
										</p>
									</Card.Content>
								</Card>
							</Grid.Column>

							<Grid.Column width={10}>
								<h1>Repositories</h1>
								<List divided relaxed>
									{repos?.length &&
										repos.map((repo, i) => (
											<List.Item key={i}>
												<List.Icon
													name='github'
													size='large'
													verticalAlign='middle'
												/>
												<List.Content>
													<List.Header as='a'>
														{repo.name}
													</List.Header>
													<List.Description as='a'>
														Last updated at{' '}
														{repo.updated_at}
													</List.Description>
												</List.Content>
												<List.Icon
													name='star outline'
													size='large'
													verticalAlign='bottom'
												/>
												<List.Content verticalAlign='bottom'>
													<List.Description as='a'>
														{repo.stargazers_count}
													</List.Description>
												</List.Content>
											</List.Item>
										))}
								</List>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={8}>
								<Button primary onClick={() => handleLogout()}>
									Logout
								</Button>
							</Grid.Column>
							<Grid.Column width={5}>
								<Pagination
									onPageChange={(e) => handlePageChange(e)}
									defaultActivePage={totalPages}
									totalPages={totalPages}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</Wrapper>
		</Container>
	);
}

const Wrapper = Styled.section`
.profile-card {
	margin-top: 30px;
	margin-bottom: 30px;
}
`;
