const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const authService = {
    async login(identifier: string) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier })
        });
        return response.json();
    },

    async verifyOTP(identifier: string, otpCode: string) {
        const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier, otpCode })
        });
        return response.json();
    },

    async validateToken(token: string) {
        const response = await fetch(`${API_BASE_URL}/auth/validate`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
    },

    getToken() {
        return localStorage.getItem("token");
    },

    getRole() {
        return localStorage.getItem("role");
    },

    getUserInfo() {
        return {
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            role: localStorage.getItem("role")
        };
    }
};

export const registrationService = {
    async submitRegistration(data: any) {
        const response = await fetch(`${API_BASE_URL}/auth/registration/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async getPendingRequests() {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/auth/registration/pending`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getRequestById(id: number) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/auth/registration/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async approveRegistration(data: any) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/auth/registration/approve`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    async uploadIdCard(file: File) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_BASE_URL}/auth/upload/id-card`, {
            method: "POST",
            body: formData
        });
        return response.json();
    }
};

export const userManagementService = {
    async getAllUsers() {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/auth/users`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getUsersByRole(role: string) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/auth/users/role/${role}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async disableUser(userId: number) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/auth/users/${userId}/disable`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async enableUser(userId: number) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/auth/users/${userId}/enable`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    }
};

export const academicService = {
    async getMarks(studentId: number) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/academic/marks/student/${studentId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getAttendance(studentId: number) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/academic/attendance/student/${studentId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getSyllabus() {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/academic/syllabus`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    }
};

export const analyticsService = {
    async getMarksProgression(studentId: number, subjectId: number) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/academic/analytics/progression/${studentId}?subjectId=${subjectId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getPerformanceSummary(studentId: number) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/academic/analytics/summary/${studentId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getClassRankings(classId: number, examType: string, term: string, limit: number = 10) {
        const token = authService.getToken();
        const response = await fetch(
            `${API_BASE_URL}/academic/analytics/rankings/${classId}?examType=${examType}&term=${term}&limit=${limit}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        );
        return response.json();
    },

    async getStudentRank(studentId: number, classId: number, examType: string, term: string) {
        const token = authService.getToken();
        const response = await fetch(
            `${API_BASE_URL}/academic/analytics/rank/${studentId}?classId=${classId}&examType=${examType}&term=${term}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        );
        return response.json();
    },

    async getClassStatistics(classId: number, examType: string, term: string) {
        const token = authService.getToken();
        const response = await fetch(
            `${API_BASE_URL}/academic/analytics/class-stats/${classId}?examType=${examType}&term=${term}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        );
        return response.json();
    },

    async generateRankings(classId: number, examType: string, term: string) {
        const token = authService.getToken();
        const response = await fetch(
            `${API_BASE_URL}/academic/analytics/rankings/generate?classId=${classId}&examType=${examType}&term=${term}`,
            {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` }
            }
        );
        return response.json();
    }
};

export const scoreboardService = {
    async getScoreboardData() {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/academic/scoreboard/all`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getAllHighScores() {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/academic/scoreboard/high-scores`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getSubjectHighScore(subjectId: number) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/academic/scoreboard/high-scores/${subjectId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getPerfectScores() {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/academic/scoreboard/perfect-scores`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getExamTopScorers(examType: string, term: string) {
        const token = authService.getToken();
        const response = await fetch(
            `${API_BASE_URL}/academic/scoreboard/exam-top-scorers?examType=${examType}&term=${term}`,
            { headers: { "Authorization": `Bearer ${token}` } }
        );
        return response.json();
    }
};

export const qnaService = {
    async submitQuestion(questionData: any) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/communication/qna/questions`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(questionData)
        });
        return response.json();
    },

    async answerQuestion(questionId: number, answerData: any) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/communication/qna/questions/${questionId}/answer`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(answerData)
        });
        return response.json();
    },

    async getMyQuestions(userId: number) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/communication/qna/questions/my-questions?userId=${userId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getInbox(recipientId?: number, status?: string) {
        const token = authService.getToken();
        let url = `${API_BASE_URL}/communication/qna/questions/inbox`;
        const params = new URLSearchParams();
        if (recipientId) params.append("recipientId", recipientId.toString());
        if (status) params.append("status", status);
        if (params.toString()) url += `?${params.toString()}`;

        const response = await fetch(url, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getQuestion(questionId: number) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/communication/qna/questions/${questionId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async updateQuestionStatus(questionId: number, status: string) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/communication/qna/questions/${questionId}/status?status=${status}`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getStatistics() {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/communication/qna/statistics`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    }
};

export const communicationService = {
    async getNotices() {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/communication/notices`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getNotifications(userId: number) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/communication/notifications/user/${userId}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async markNotificationAsRead(notificationId: number) {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/communication/notifications/${notificationId}/read`, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    }
};

export const calendarService = {
    async getEvents() {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/calendar/events`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    },

    async getUpcomingEvents() {
        const token = authService.getToken();
        const response = await fetch(`${API_BASE_URL}/calendar/events/upcoming`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        return response.json();
    }
};
