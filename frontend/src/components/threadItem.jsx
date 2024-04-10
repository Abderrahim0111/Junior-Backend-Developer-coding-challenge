import React from "react";
import moment, {} from 'moment'

const ThreadItem = ({ thread }) => {
  return (
    <div className=" p-3 border rounded-lg">
      <p><span className=" text-green-900">Name:</span> {thread.user_id.name}</p>
      <p><span className=" text-green-900">Followers:</span> {thread.profile_id.followers_count}</p>
      <p><span className=" text-green-900">Age:</span> {thread.profile_id.age}</p>
      <p><span className=" text-green-900">Language:</span> {thread.profile_id.language}</p>
      <p><span className=" text-green-900">City:</span> {thread.profile_id.city}</p>
      <hr className=" my-2"/>
      <p><span className=" text-green-900">Thread likes:</span> {thread.likes_count}</p>
      <p><span className=" text-green-900">Created at:</span> {moment(thread.createdAt).format('MMM Do, h:mm:ss a')}</p>
    </div>
  );
};

export default ThreadItem;
