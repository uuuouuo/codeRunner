//package com.example.chat.repository;
//
//import com.example.chat.model.entity.ChatPost;
//import lombok.RequiredArgsConstructor;
//import org.springframework.jdbc.core.BatchPreparedStatementSetter;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Repository;
//
//import java.sql.PreparedStatement;
//import java.sql.SQLException;
//import java.sql.Timestamp;
//import java.util.List;
//
//@Repository
//@RequiredArgsConstructor
//public class JdbcRepository {
//
//    private final JdbcTemplate jdbcTemplate;
//
//
//    public void batchInsertRoomInventories(List<ChatPost> chatPosts){
//
//
//        String sql = "INSERT INTO chatPosts"
//                +  "(user_id, chat_room_id, content, create_time) VALUE(?,?,?,?)";
//
//
//        jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
//            @Override
//            public void setValues(PreparedStatement ps, int i) throws SQLException {
//                ChatPost chatPost = chatPosts.get(i);
//                ps.setString(1,chatPost.getUser().getId());
//                ps.setInt(2,chatPost.getChatRoom().getId());
//                ps.setString(3,chatPost.getContent());
//                ps.setTimestamp(4, Timestamp.valueOf(chatPost.getCreateTime()));
//            }
//
//            @Override
//            public int getBatchSize() {
//                return chatPosts.size();
//            }
//        });
//    }
//}
