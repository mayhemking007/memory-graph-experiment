export const convData =  [
  {
    "id": "1",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "What is a vector database?",
    "position": 1,
    "createdAt": "2025-01-01T10:00:00Z"
  },
  {
    "id": "2",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "A vector database is a specialized database designed to store, index, and retrieve high-dimensional vector embeddings efficiently. These embeddings are often generated from machine learning models and represent data such as text, images, or audio in numerical form. Vector databases use similarity search techniques like cosine similarity or Euclidean distance to find the closest matches.",
    "position": 2,
    "createdAt": "2025-01-01T10:00:05Z"
  },
  {
    "id": "3",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "How is it different from SQL databases?",
    "position": 3,
    "createdAt": "2025-01-01T10:00:10Z"
  },
  {
    "id": "4",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "Traditional SQL databases store structured data and are optimized for exact match queries using indexes like B-trees. In contrast, vector databases are optimized for similarity search on embeddings. Instead of matching exact values, they retrieve results based on closeness in vector space, which is essential for AI applications like semantic search.",
    "position": 4,
    "createdAt": "2025-01-01T10:00:15Z"
  },

  {
    "id": "5",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "What is an embedding?",
    "position": 5,
    "createdAt": "2025-01-01T10:00:20Z"
  },
  {
    "id": "6",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "An embedding is a numerical representation of data in a high-dimensional space. For example, text embeddings convert sentences into vectors such that semantically similar sentences are closer together in that space. These are generated using models like transformers and are widely used in NLP, recommendation systems, and search.",
    "position": 6,
    "createdAt": "2025-01-01T10:00:25Z"
  },

  {
    "id": "7",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "Switching topic, what is machine learning?",
    "position": 7,
    "createdAt": "2025-01-01T10:00:30Z"
  },
  {
    "id": "8",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "Machine learning is a subset of artificial intelligence that enables systems to learn patterns from data and improve performance over time without being explicitly programmed. It involves training models on datasets so they can make predictions or decisions based on new inputs.",
    "position": 8,
    "createdAt": "2025-01-01T10:00:35Z"
  },

  {
    "id": "9",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "What are types of ML?",
    "position": 9,
    "createdAt": "2025-01-01T10:00:40Z"
  },
  {
    "id": "10",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "There are three main types of machine learning: supervised learning, where models learn from labeled data; unsupervised learning, where patterns are discovered without labels; and reinforcement learning, where agents learn by interacting with an environment and receiving rewards or penalties.",
    "position": 10,
    "createdAt": "2025-01-01T10:00:45Z"
  },

  {
    "id": "11",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "Now tell me about system design basics",
    "position": 11,
    "createdAt": "2025-01-01T10:01:00Z"
  },
  {
    "id": "12",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "System design involves designing scalable, reliable, and efficient systems. It includes understanding requirements, choosing appropriate architectures like monolith or microservices, handling scalability using load balancing and caching, and ensuring fault tolerance through redundancy.",
    "position": 12,
    "createdAt": "2025-01-01T10:01:05Z"
  },

  {
    "id": "13",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "What is load balancing?",
    "position": 13,
    "createdAt": "2025-01-01T10:01:10Z"
  },
  {
    "id": "14",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "Load balancing is the process of distributing incoming network traffic across multiple servers to ensure no single server becomes overwhelmed. It improves reliability and performance by utilizing resources efficiently and providing failover capabilities.",
    "position": 14,
    "createdAt": "2025-01-01T10:01:15Z"
  },

  {
    "id": "15",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "Explain caching briefly",
    "position": 15,
    "createdAt": "2025-01-01T10:01:20Z"
  },
  {
    "id": "16",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "Caching stores frequently accessed data in a faster storage layer like memory to reduce latency and database load. Systems like Redis or Memcached are commonly used for caching in distributed systems.",
    "position": 16,
    "createdAt": "2025-01-01T10:01:25Z"
  },

  {
    "id": "17",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "Switch again, what is Docker?",
    "position": 17,
    "createdAt": "2025-01-01T10:02:00Z"
  },
  {
    "id": "18",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "Docker is a containerization platform that allows developers to package applications along with their dependencies into containers. These containers can run consistently across different environments, making deployment more predictable and scalable.",
    "position": 18,
    "createdAt": "2025-01-01T10:02:05Z"
  },

  {
    "id": "19",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "What is Kubernetes then?",
    "position": 19,
    "createdAt": "2025-01-01T10:02:10Z"
  },
  {
    "id": "20",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "Kubernetes is an orchestration system for managing containerized applications. It automates deployment, scaling, and operations of containers, ensuring high availability and efficient resource utilization across clusters.",
    "position": 20,
    "createdAt": "2025-01-01T10:02:15Z"
  },

  {
    "id": "21",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "Okay random question, what is your favorite programming language?",
    "position": 21,
    "createdAt": "2025-01-01T10:03:00Z"
  },
  {
    "id": "22",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "I do not have personal preferences, but many developers enjoy languages like Python for its simplicity, JavaScript for web development, and Go for building scalable backend systems due to its concurrency model.",
    "position": 22,
    "createdAt": "2025-01-01T10:03:05Z"
  },

  {
    "id": "23",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "Why is Python so popular?",
    "position": 23,
    "createdAt": "2025-01-01T10:03:10Z"
  },
  {
    "id": "24",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "Python is popular because of its simple syntax, large ecosystem of libraries, and versatility. It is widely used in web development, data science, machine learning, automation, and scripting tasks.",
    "position": 24,
    "createdAt": "2025-01-01T10:03:15Z"
  },

  {
    "id": "25",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "Go back to system design, what is database sharding?",
    "position": 25,
    "createdAt": "2025-01-01T10:04:00Z"
  },
  {
    "id": "26",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "Database sharding is a technique where a large database is split into smaller, more manageable pieces called shards. Each shard holds a subset of the data, allowing the system to scale horizontally and handle larger loads.",
    "position": 26,
    "createdAt": "2025-01-01T10:04:05Z"
  },

  {
    "id": "27",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "What is replication?",
    "position": 27,
    "createdAt": "2025-01-01T10:04:10Z"
  },
  {
    "id": "28",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "Replication involves copying data from one database server to another to improve reliability and availability. It ensures that even if one server fails, data can still be accessed from replicas.",
    "position": 28,
    "createdAt": "2025-01-01T10:04:15Z"
  },

  {
    "id": "29",
    "conv_id" : "ch-01",
    "role": "user",
    "content": "Tell me something interesting",
    "position": 29,
    "createdAt": "2025-01-01T10:05:00Z"
  },
  {
    "id": "30",
    "conv_id" : "ch-01",
    "role": "assistant",
    "content": "An interesting fact is that modern AI systems can generate embeddings that capture semantic meaning so effectively that even loosely related concepts can be linked through vector similarity, enabling powerful search and recommendation systems.",
    "position": 30,
    "createdAt": "2025-01-01T10:05:05Z"
  }
]