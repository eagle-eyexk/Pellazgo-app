import SwiftUI

struct SplashView: View {
    @State private var isActive = false
    @State private var opacity = 0.0
    @State private var scale = 0.85

    var body: some View {
        if isActive {
            ContentView()
        } else {
            ZStack {
                Color(red: 15/255, green: 35/255, blue: 24/255)
                    .ignoresSafeArea()

                VStack(spacing: 20) {
                    Image("AppLogo")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 130, height: 130)
                        .clipShape(RoundedRectangle(cornerRadius: 28, style: .continuous))
                        .shadow(color: .black.opacity(0.4), radius: 16, x: 0, y: 8)

                    Text("Pellazgo")
                        .font(.custom("Georgia", size: 30))
                        .fontWeight(.semibold)
                        .foregroundColor(Color(red: 212/255, green: 175/255, blue: 55/255))
                }
                .scaleEffect(scale)
                .opacity(opacity)
                .onAppear {
                    withAnimation(.easeOut(duration: 0.6)) {
                        opacity = 1.0
                        scale = 1.0
                    }
                    DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
                        withAnimation(.easeIn(duration: 0.35)) {
                            opacity = 0
                        }
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.35) {
                            isActive = true
                        }
                    }
                }
            }
        }
    }
}
