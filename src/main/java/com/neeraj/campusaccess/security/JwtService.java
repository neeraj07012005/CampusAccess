package com.neeraj.campusaccess.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    // JWT secret comes from application-prod.properties / environment variable
    @Value("${jwt.secret}")
    private String secretKey;

    private SecretKey getKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    // Generate JWT
    public String generateToken(String username) {

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60)
                )
                .signWith(getKey())
                .compact();
    }

    // Extract username
    public String extractUsername(String token) {

        return extractClaims(token).getSubject();
    }

    // Validate token
    public boolean isTokenValid(String token, String username) {

        return extractUsername(token).equals(username)
                && !isTokenExpired(token);
    }

    // Check whether token has expired
    private boolean isTokenExpired(String token) {

        return extractClaims(token)
                .getExpiration()
                .before(new Date());
    }

    // Extract claims from JWT
    private Claims extractClaims(String token) {

        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}