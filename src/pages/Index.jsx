import React, { useState } from "react";
import { Container, VStack, HStack, Text, Textarea, Button, Box, IconButton, useToast } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaLaugh, FaSadTear } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const toast = useToast();

  const addPost = () => {
    if (newPost.trim() === "") {
      toast({
        title: "Post cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setPosts([...posts, { id: Date.now(), content: newPost, reactions: { like: 0, dislike: 0, laugh: 0, sad: 0 } }]);
    setNewPost("");
  };

  const addReaction = (postId, reactionType) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, reactions: { ...post.reactions, [reactionType]: post.reactions[reactionType] + 1 } } : post)));
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="Write your post here..." />
        <Button onClick={addPost} colorScheme="teal">
          Post
        </Button>
        {posts.map((post) => (
          <Box key={post.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
            <Text mb={4}>{post.content}</Text>
            <HStack spacing={4}>
              <IconButton aria-label="Like" icon={<FaThumbsUp />} onClick={() => addReaction(post.id, "like")} />
              <Text>{post.reactions.like}</Text>
              <IconButton aria-label="Dislike" icon={<FaThumbsDown />} onClick={() => addReaction(post.id, "dislike")} />
              <Text>{post.reactions.dislike}</Text>
              <IconButton aria-label="Laugh" icon={<FaLaugh />} onClick={() => addReaction(post.id, "laugh")} />
              <Text>{post.reactions.laugh}</Text>
              <IconButton aria-label="Sad" icon={<FaSadTear />} onClick={() => addReaction(post.id, "sad")} />
              <Text>{post.reactions.sad}</Text>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
