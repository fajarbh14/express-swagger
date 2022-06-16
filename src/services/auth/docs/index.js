module.exports = {
	"/register": {
		post: {
			tags: ["Auth"],
			name: "register",
			summary: "register new user",
			consumes: ["application/json"],
			security: [
				{
					bearerAuth: [],
				},
			],
			requestBody: {
				name: "Post",
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								name: {
									type: "string",
									example: "Jhon Doe",
								},
								email: {
									type: "string",
									example: "jhonDoe@example.com",
								},

								password: {
									type: "string",
									example: "password",
								},
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: "Success Response",
					content: {
						"application/json": {
							example: {
								code: 200,
								status: "success",
								message: "Register Successfully",
								data: {
									name: "jhonDoe",
									email: "jhonDoe@gmail.com",
								},
							},
						},
					},
				},
			},
		},
	},
	"/login": {
		post: {
			tags: ["Auth"],
			name: "Login",
			summary: "Login user",
			consumes: ["application/json"],
			security: [
				{
					bearerAuth: [],
				},
			],
			requestBody: {
				name: "Post",
				required: true,
				content: {
					"application/json": {
						schema: {
							type: "object",
							properties: {
								email: {
									type: "string",
									example: "jhonDoe@example.com",
								},

								password: {
									type: "string",
									example: "password",
								},
							},
						},
					},
				},
			},
			responses: {
				200: {
					description: "Success Response",
					content: {
						"application/json": {
							example: {
								code: 200,
								status: "success",
								message: "Login Successfully",
								data: {
									user: {
										name: "Test",
										email: "test21111@test1.com",
									},
									accessToken: "JWT TOKEN",
								},
							},
						},
					},
				},
			},
		},
	},

	"/create-token": {
		get: {
			tags: ["Auth"],
			name: "create Access Token",
			summary: "create Access Token",
			consumes: ["application/json"],
			security: [
				{
					bearerAuth: [],
				},
			],

			responses: {
				200: {
					code: 200,
					status: "success",
					message: "Access Token Successfully Generated",
					data: {
						user: {
							name: "Test",
							email: "test21111@test1.com",
						},
						token: "JWT TOKEN",
					},
				},
			},
		},
	},
	"/logout": {
		post: {
			tags: ["Auth"],
			name: "Logout",
			summary: "Logout user",
			consumes: ["application/json"],
			security: [
				{
					bearerAuth: [],
				},
			],
			responses: {
				200: {
					description: "Success Response",
					content: {
						"application/json": {
							example: {
								code: 200,
								status: "success",
								message: "User Succesfully Logout",
								data: null,
							},
						},
					},
				},
			},
		},
	},
};
