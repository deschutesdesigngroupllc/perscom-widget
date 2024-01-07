'use client';

import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { Avatar, AvatarGroup, Tooltip } from 'flowbite-react';
import { pluralize } from '../../../../utils/helpers';

export function Likes({ likes, currentUser }) {
  const newsfeedItemIsLiked = (id) => {
    return (
      likes &&
      likes.filter(function (user) {
        return String(user.id) === String(id);
      }).length > 0
    );
  };

  return (
    <div className="flex flex-row items-center space-x-2">
      {newsfeedItemIsLiked(currentUser) ? (
        <Tooltip content="Unlike">
          <div
            className="w-7.5 flex cursor-pointer items-center rounded-full border border-blue-400 bg-blue-600 p-0.5 hover:bg-blue-500"
            onClick={() => onUnlikeClick(id)}
          >
            <FaceSmileIcon className="h-6 w-6 text-gray-200" />
          </div>
        </Tooltip>
      ) : (
        <Tooltip content="Like">
          <div
            className="w-7.5 flex cursor-pointer items-center rounded-full border border-gray-300 bg-gray-100 p-0.5 hover:bg-gray-200"
            onClick={() => onLikeClick(id)}
          >
            <FaceSmileIcon className="h-6 w-6 text-gray-400 dark:text-gray-700" />
          </div>
        </Tooltip>
      )}
      <div className="flex flex-row items-center space-x-2">
        <AvatarGroup className="flex flex-wrap gap-2">
          {likes &&
            !!likes.length &&
            likes.slice(0, 5).map(function (user) {
              return (
                <>
                  <Tooltip key={user.id} content={user.name}>
                    <Avatar key={user.id} stacked rounded alt={user.name} size="xs" />
                  </Tooltip>
                </>
              );
            })}
        </AvatarGroup>
        {likes && !!likes.length && (
          <div className="text-xs">{`${pluralize(likes.length, 'like')}`}</div>
        )}
      </div>
    </div>
  );
}
