import { IUserFilter } from "./user.interface";

export const userHandler = {
  handler: {
    getQuerySpec: (query: IUserFilter) => {
      const { createdFrom, createdTo, ...other } = query;
      const filterSpec: Record<string, any> = {
        $query: other,
      };
      if (query.createdFrom) {
        filterSpec.$query.createdAt = { $gte: new Date(createdFrom) };
      }
      if (query.createdTo) {
        if (!filterSpec.$query.createdAt) {
          filterSpec.$query.createdAt = { $lte: new Date(createdTo) };
        } else {
          filterSpec.$query.createdAt = {
            ...filterSpec.$query.createdAt,
            $lte: new Date(createdTo),
          };
        }
      }
      return filterSpec;
    },
  },
};
