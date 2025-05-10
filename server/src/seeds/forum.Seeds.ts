export const forumSeeds = {
    topics: [
      {
        title: "Getting Started with React",
        content: "What resources would you recommend for learning React?",
        authorId: 4,
        category: "Frontend Development",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Career Transition Tips",
        content: "Looking for advice on switching to tech from another field",
        authorId: 6,
        category: "Career Advice",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    comments: [
      {
        content: "The official React docs are a great starting point!",
        authorId: 5,
        topicId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "I recommend starting with small projects to build confidence",
        authorId: 4,
        topicId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  };
  
  